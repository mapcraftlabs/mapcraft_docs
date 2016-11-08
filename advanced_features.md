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
### typeMap

Setting the typeMap is not required, but it can make the behavior more consistent for the types of the attributes.  The function should return an object where the keys are the names of the attributes and the values are strings describing the types.  Right now type values are 'float', 'string', and 'percent'.  These types are used to convert attributes to the appropriate types before performing analysis, to save them as appropriate types after the user enters data in the input forms, etc.  The percent type is used so that the user can enter a number between 1 and 100 and the app will divide that number so it is in a range of .01 to 1.0 for analysis (which is what the Excel converter usually expects).

```javascript
typeMap: function () {
    return {
        residential_units: 'float',
        job_spaces: 'float',
        land_use: 'string',
        interest_rate: 'percent'
    }
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

## The Three "Tiers" of App

* A Tier 1 App has exactly one study area (set of shapes).  The number of shapes which can be in each study area is limited by what Leaflet can render in the browser comfortably and is about 5,000 shapes.

* A Tier 2 App has more shapes than can be represented in a Tier 1 App and thus the shapes are separated into multiple study areas usually with an "overview map".  Each study area might be a neighborhood of parcels, and the overview map would be a map of the neighborhoods.  Each study area then is still essentially a Tier 1 App.

* A Tier 3 App is a Tier 2 App that usually has other layers which join to the shapes in the study areas.  For instance, attributes could also be edited on neighborhoods and joined to the parcels.  A Tier 3 App usually has a regional analysis module which collates data for each shape and also the higher-level layers (like neighborhoods and cities) and then performs analysis on the result (runs a spreadsheet on each shape) and then aggregates or exports the results.  

Both the Tier 2 and Tier 3 Apps can have several hundred thousand shapes combined among the study areas, but the Tier 3 App will perform analytics on all of those shapes together, which can take several seconds, requires progress bars, choice of data from multiple scenarios and other complications.

The next set of features is generally used in the Tier 3 App.

## Layers

Layers are used to associate attributes with higher-level shapes like neighborhoods, cities, block groups, zoning areas, etc.  One or more other layers can be configured, and the app will switch between the primary layer and each of the secondary layers.  Other than that, each layer will look exactly like a study area and provide the exact same functionality (a layer is essentially the same as a study area in the code).

Thus to configure a second layer, specify a shapeUrl which is the geojson for the shapes, and many of the same attributes from the main config object as shown below.  This will likely include which attributes to theme, which to edit, and so forth.  Once an object is built for the secondary layer, that object should be included in the main configuration object using the extraLayers attribute, which is an object where keys are layer names and values are layer configuration objects.  You should also provide a defaultLayerName, which is the name of the layer represented by the main configuration object, and will be used in the UI to switch back to the main overview map.

```javascript

config2 = {

    shapeUrl: 'https://mapcraftlabs.github.io/seattle_parcels/seattle_neighborhoods.geojson',

    keyAttr: 'NAME',

    themes: function () {
        // put something here
    },

    tableColumns: function () {
        // put something here
    },

    editableAttributes: function () {
        // put something here
    },

    globalAttributes: function () {
        // put something here
    },

    placeHeadingTemplate: "\
        <h3 style='margin-top: 0px;'>{{p.NAME}}</h3>",

    hoverFeatureTemplate: function () {
        // put something here
    }
};

config = {
    // add many other configuration attributes here
    defaultLayerName: "Parcels",
    extraLayers: {
        "Neighborhoods": config2
    }
}
```

## App-wide Analysis

A key feature of the Tier 3 app is to do regional-level analysis.  This involves collating data from potentially several places.  The data is layered on in a certain order, although the featureMergeFunction below allows the user to change the default priority.  By default, data is merged in the following way:

1.  Start with the feature from the original geojson data.  

2.  Override any attributes that have been edited within the app by the user using the latest value for each attribute.

3.  Iterate though each extra layer and include any attributes that have been set in that layer.  If any attributes are already present, use the value from the layer rather than the value from the feature (more specific value wins).

4.  Add any global attributes to the feature.  As above, if any attributes are already present, use the value from the layer rather than the value from the feature (more specific value wins).

5.  If the analysisDefaultInputs object is set, use these values to fill in additional defaults, but do not override existing values.

6.  Run the analysisFunction on the object that results from the above steps.  Keep track of the results.  Allow the user to download separate csvs of the input and output attributes.  The separate csvs are only necessary because of memory limitations in the browser.

### baseDataCSVUrl and baseDataLayerJoinKeys

There are two ways the base data can be attained.  The first is to iterate through the overview shapefile and to fetch the geojson for every study area that's identified in the overview.  The app will then merge all the "properties" objects of all the features is all the study area geojson files into one big list of features, and then iterate through the steps above.

The second option is do go ahead and cache the list of all features as a separate csv file.  This file can actually be generated in the app using the export all menu, and then hosted somewhere on the internet (like github.io).  Note that this will actually duplicate data, with data occuring once in the study area geojson file and once in the csv file and the user is responsible for making sure the two stay in sync.  The benefit of this is that the cvs loads several times faster and can be easily cached by the browser, while fetching all the geojson files takes much longer.  To use the second option, specify a link in the baseDataCSVUrl.

With either method, the app will also need a baseDataLayerJoinKeys object, which specifies a key which is an attribute in the list of features and a value which is the layer for which that is a join key.  For instance, the attribute '_studyArea' could occur in the csv file and join the key of the 'Neighborhoods' layer.  In fact the '_studyArea' attribute is a special attribute that gets added to the features that are created in the first option above.  The id used to identify each study area will be added as a value of each feature under the key '_studyArea'.  Thus the use of _studyArea as the join key implies the overview map and join layer are one and the same.

```javascript
baseDataCSVUrl: "https://mapcraftlabs.github.io/seattle_parcels/seattle_base_data.csv",
baseDataLayerJoinKeys: {
    '_studyArea': 'Neighborhoods'
},
```

analysisDefaultInputs and analysisFunction

These two attributes are used as descibed in steps 5 and 6 above.

```javascript
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
analysisFunction: function (d) {
    return proforma(d);
},
```

### featureMergeFunction

For bonus points, the app exposes a featureMergeFunction which allows the user to configure how data gets merged between the base places, the various layers, the defaults, and how types get converted when doing app-wide analysis.  This method might be moved into the app at some point if this becomes standard, but for now it is configurable by the user.  To accept default behavior just copy this function into the main config.  This method won't be documented as thoroughly as it's really an expert parameter.

```javascript
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
```
