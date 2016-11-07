# Advanced Features

## Circles

### csvLngLatcols

CSV files can actually be substituted for geojson files if the geometry is desired to be circles.  If that's the case, the lat-lng should be two different floating point columns in the csv and the names of the two columns should be specified using csvLngLatcols (first lng then lat as the name implies).

```javascript
overViewIdAttrToGeojson: function (attr) {
    return 'https://oaklandanalytics.github.io/scratchpad/data/parcels/bayarea_parcels_' + attr + '.csv';
},
csvLngLatcols: ["x", "y"],
```

### customMapAddFunction

The customMapAddFunction shoudl also be used to make circles using the leaflet API.  If you want standard circles just copy the code below, but anything supported by the Leaflet API should work.  The function will be passed a list of shapes and a Leaflet feature layer.  Simply build a representation of each shape using the Leaflet API and add it to the feature layer.

```javascript
customMapAddFunction: function(shapes, featureLayer) {
    _.each(shapes.features, function (shape) {
        var coords = shape.geometry.coordinates
        var layer = L.circleMarker([coords[1], coords[0]])
        layer.feature = shape;
        layer.addTo(featureLayer);
    });
},
```

### radiusInterpolate and defaultRadiusValue

To change the circle radius as part of the theme, use the radiusInterpolate attribute for each theme.  This will scale the circle radius from the min to the max just as it would with the two colors which are part of the `interpolate` attribute.  The defaultRadiusValue will be used to provide a constant (non-interpolated) radius whenever radiusInterpolate is not provided.

```javascript
defaultRadiusValue: 8,
'Residential Units': {
    attr: 'residential_units',
    opacity: .9,
    forceNumeric: true,
    outlineColor: '#000000',
    highlightColor: '#ffffcc',
    scaleType: 'linear',
    interpolate: ['#fff5eb', '#7f2704'],
    radiusInterpolate: [5, 10]
},
```

## Other Advanced Attributes

### modifyGeoJsonFeatures

Sometimes it's helpful to be able to modify the geojson data after it has been loaded by the app (e.g. to change the type or to round, etc).  This can be accomplished with modifyGeoJsonFeatures, which should take a list of geojson features as a parameter and return a modified version of that list for use in the app.

```javascript
modifyGeoJsonFeatures: function (features) {
    return _.map(features, function (f) {
        _.each(["residential_units", "job_spaces", "year_built"], function (field) {
            // convert to numeric
            f.properties[field] = +f.properties[field];
        })
        _.each(["building_sqft", "max_dua"], function (field) {
            // cast to int
            f.properties[field] = Math.round(+f.properties[field]);
        })
        _.each(["max_far"], function (field) {
            // round to one decimal
            f.properties[field] = Math.round(+f.properties[field]*10)/10;
        })
        return f;
    });
},
```

## Charts

Charts are an integral part of the Labs app, but they're not built-in.  The hooks are there, but the user of the app still has to use Javascript libraries to create the charts.  A common choice is the [nvd3](http://nvd3.org/) library used in the example below, but this is by no means the only way to make charts.  

This example is probably not the only way to build charts in the app, but it seems like a sensible workflow.  This example assumes the charts are designed to be placed on the analytics pane.

First of all, the values to be charted should be computed within the aggregateAnalytics method.  After that is done, the object which contains that data should be passed to another method which generates the chart.  Here that method is called addFeasibilityChart, which uses the nvd3 API to build a chart.  Finally, the chart is set on the DOM element with the id `FeasibilityChart`.  Note that id created as part of the analyticsTemplate.

To summarize, make a div in one of the HTML templates with a given ID.  Then in one of the callbacks, likely aggregateAnalytics, compute the data to go into the chart and use the charting API to build the chart.  It is not common to have several charts in the analytics pane, and this process can be repeated for each chart.

The use of nvd3 in charts int he config file is also the reason why the nvd3 js and css are frequently included in the html page.  If you don't need charts, you can remove those includes to speed up load times.

```javascript
addFeasibilityChart: function (analytics) {

    var data = [{
        key: "Building Types",
        values: [{
            label: "Garden Walkups",
            value: analytics["Garden Walkups Feasibility"]
        }, {
            label: "4 over 1",
            value: analytics["4 over 1 Podium Feasibility"]
        }, {
            label: "Tower",
            value: analytics["Tower Feasibility"]
        }]
    }];

    nv.addGraph(function() {

        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.value })
          .staggerLabels(false)
          ;

        chart.yAxis
          .axisLabel('Count of Feasible Neighborhoods')

        d3.select('#FeasibilityChart svg')
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
},

aggregateAnalytics: function (features, callback, accumulator) {

    var that = this;
    ss.getAggregateAnalytics(features, function (v) {

        callback(v);
        that.addFeasibilityChart(v);
    }, accumulator);
},

analyticsTemplate: function () {
    return '<div id="FeasibilityChart"><h3 align="center"><b>Feasible Neighborhoods by Building Type</b></h3><svg style="height: 400px; width: 370px;"></svg></div>';
},
```

    config2 = {
    // study areas are selected via a dropdown of via map - if via map leave this empty
    shapeUrl: 'https://mapcraftlabs.github.io/seattle_parcels/seattle_neighborhoods.geojson',
    // property of the features which should be unique amont all features
    keyAttr: 'NAME',

    getRows: function () {
        return _.where(PROFORMA_INPUTS, {'Layer': 'Neighborhood'});
    },

    themes: function () {
        return helpers.getThemes(this.getRows()); 
    },

    tableColumns: function () {
        return helpers.getTableColumns(this.getRows());
    },

    editableAttributes: function () {
        return helpers.inputGroupsFromJson(this.getRows());
    },

    globalAttributes: function () {
        return helpers.inputGroupsFromJson(PROFORMA_GLOBALS); 
    },
 
    placeHeadingTemplate: "\
        <h3 style='margin-top: 0px;'>{{p.NAME}}</h3>",

    hoverFeatureTemplate: function () {
        return helpers.getDefaultHoverFeature(this.getRows());
    }
};

    defaultLayerName: "Parcels",
    extraLayers: {
        "Neighborhoods": config2
    },

        typeMap: function () {
        var d = {};
        _.each(PROFORMA_GLOBALS, function (o) {
            d[o.InternalName] = o.Type;
        });
        _.each(PROFORMA_INPUTS, function (o) {
            d[o.InternalName] = o.Type;
        });
        return d;
    },

        formatLabel: function (attr) {
        var o = _.where(PROFORMA_INPUTS, {'InternalName': attr})[0];
        if(!o) o = _.where(PROFORMA_OUTPUTS, {'InternalName': attr})[0];
        return helpers.formatData('p', o.InternalName, o.NmbrFmt, o.Type);
    },

    baseDataCSVUrl: "https://mapcraftlabs.github.io/seattle_parcels/seattle_base_data.csv",
    baseDataLayerJoinKeys: {
        '_studyArea': 'Neighborhoods'
    },

    analysisDefaultInputs: {
        'Land Value': 1000000,
        'Improvement Value': 1250000,
        'Land Use': 'Text',
        'Parcel Size': 10000,
        'Residential Vacancy Rate': 10,
        'Residential Market Rent': 4,
        'HUD Median Family Income': 73900,
        'Rent Restricted Units': 20,
        'Depth of Affordability': 80,
        'Surface parking': 7000,
        'Integrated deck': 33000,
        'Podium parking': 30000,
        'Underground parking': 40000,
        'Podium Residential': 150,
        'Lobby construction cost': 165,
        'Wood frame 3-story walkup': 125,
        'Wood frame 3-story wrap w-green roof': 150,
        'Low-rise wood frame on podium': 165,
        'High-rise residential': 210,
        'Landscaping': 5,
        'Plaza-Active Courtyard': 30,
        'Multifamily Operating Cost': 30,
        'Hard Cost Contingency': 4,
        'Soft Costs': 25,
        'Developer Fee': 4,
        'CAP Rate': 4.5,
        'Return on Cost Spread over CAP': 1.5,
        'Threshold for Feasibility': 10
    },

    featureMergeFunction: function (f, layerData) {

        _.each(f, function (v, k) {
            // change null to undefined for _.defaults below
            if(v == null) f[k] = undefined;
        });

        if(config.baseDataLayerJoinKeys) {
            _.each(config.baseDataLayerJoinKeys, function(v, k) {

                if(!layerData[v]) return;

                var joinId = f[k];
                var joinData = layerData[v]['places'][joinId];                    
                // don't override parcel level data with layer data
                f = _.defaults(f, joinData);

                var globalData = layerData[v]['assumptions'];
                // don't override parcel data with global data
                f = _.defaults(f, globalData);                    
            })
        }

        // merge defaults with anything else that's empty
        if(config.analysisDefaultInputs)
            f = _.defaults(f, config.analysisDefaultInputs);

        if(config.typeMap) {
            
            typeMap = config.typeMap();

            _.each(f, function (v, k) {
                if(typeMap[k] == 'percent') f[k] = +v / 100;
                if(typeMap[k] == 'float') f[k] = +v;
            });
        }

        return f;
    },

    analysisFunction: function (d) {
        return proforma(d);
    },
