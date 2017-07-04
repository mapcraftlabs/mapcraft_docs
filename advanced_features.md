# Advanced Features

## Filtering

First, enable filtering by setting one or both of the following attributes to true - filters can either be placed in the sidebar or in a pop-up modal (or both).

```
filtersInModal: false,
filtersInSidebar: true,
```

Then configure which attributes get filtered using code like the following.  The result should be a dictionary where the attribute name is the key and the value is either an object with `type` equal to `numeric`, `string`, or `categorical`.  The numeric type will automatically allow less then, greater than, or between type operations, while the categorical must include an `enum` attribute with a list of possible values which will be used in the filtering, e.g. one could filter to counties in a region, and the user would be able to select the counties they want to view in Labs.  The string option will allow the user to enter text and apply a filter based on a substring match.

```javascript
filterAttributes: function () {
  var ret = {};
  _.each(_.map(schema, function (fname) {
    switch (_.get(schemaTypes, fname)) {
      case 'categorical':
        ret[fname] = { type: 'categorical', enum: _.get(categories, fname) };
        break;
      case 'numeric':
        ret[fname] = { type: 'numeric' };
        break;
      default:
        ret[fname] = { type: 'string' };
        break;        
    }
  }));
  return ret;
},

// or 

filterAttributes: {
  Counties: {
    type: 'categorical',
    enum: ['San Francisco', 'San Mateo', 'Santa Clara']
  },
  'Building Sqft': {
    type: 'numeric'
  },
  'Building Name': {
    type: 'string'
  }
}
```

## New places

To add a toolbar (Leaflet Draw) to create new places, use an `addPlaces` dict similar to the one below specifying which types of shapes are allowed.  Also configure whether places can be deleted.  The `addPlacesDefaultAttributes` object can be used to specify default attributes for newly added places.

```javascript
addPlaces: {
  polygons: false,
  points: true,
  lines: false,
},
removePlaces: true,

addPlacesDefaultAttributes: {
  'Scenario 0': 1,
  'Scenario 1': 1,
  'Scenario 2': 1,
  'Scenario 3': 1
},
```

## Two-level App

The app may be configured so as not to use an overview map, if those overview shapes are actually used as a layer (in other words, to edit inputs that the disaggregate shapes join to).  So if you have parcels and tracts, and are currently using the tracts both as the overview map and also as a join layer, the preferred UI is to drop the overview map.  This is done by removing the `overviewShapes` and `overviewShapesIdAttr` from the config file (leave the `overViewIdAttrToGeojson` function as this is still used).  Then add the parameter `dblClickSwitchStudyArea` to the config for the layer which is the same as the overview shapes.  When `dblClickSwitchStudyArea` is set, double clicking will switch the study area (it will do the same thing that was previously done by clicking on the overview shapes).

Also a message is added to the layer menu to inform the user that double clicking on shapes will go to the default layer, and when the user logs in, they get sent to the first layer in the extraLayers list.

## Circles

### csvLngLatcols

CSV files can actually be substituted for geojson files if the geometry is desired to be circles.  If that's the case, the lat-lng should be two different floating point columns in the csv and the names of the two columns should be specified using csvLngLatcols (first lng then lat as the name implies).

```javascript
overViewIdAttrToGeojson: function (attr) {
    return 'https://oaklandanalytics.github.io/scratchpad/data/parcels/bayarea_parcels_' + attr + '.csv';
},
csvLngLatcols: ["x", "y"],
```

### Context Points

Context points display a point geojson file in the app for context.  The relevant attributes are below, which specify the geojson file, the style to use, the radius to use, and an attribute in the geojson properties array to use to the label the points on hover (e.g. to identify the name of the transit stop).

```javascript
contextPoints: 'shps/seattle_basketball.geojson',
contextStyle: {
    color: '#2262CC', 
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.25,
    fillColor: '#2262CC'
},
contextRadius: 5,
contextLabelAttr: 'sport_type',
```

### customMapAddFunction

The customMapAddFunction should also be used to make circles using the leaflet API.  If you want standard circles just copy the code below, but anything supported by the Leaflet API should work.  The function will be passed a list of shapes and a Leaflet feature layer.  Simply build a representation of each shape using the Leaflet API and add it to the feature layer.

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

Charts are an integral part of the Labs app, but they're not built-in.  The hooks are there, but the user of the app still has to use Javascript libraries to create the charts.  A common choice is the [nvd3](http://nvd3.org/) library used in the example below.  

This example is probably not the only way to build charts in the app, but it seems like a sensible workflow.  This example assumes the charts are designed to be placed on the analytics pane.

First of all, the values to be charted should be computed within the aggregateAnalytics method.  After that is done, the object which contains that data should be passed to another method which generates the chart.  Here that method is called addFeasibilityChart, which uses the nvd3 API to build a chart.  Finally, the chart is set on the DOM element with the id `FeasibilityChart`.  Note that id has geen created as part of the analyticsTemplate.

To summarize, make a div in one of the HTML templates with a given id.  Then in one of the callbacks, likely aggregateAnalytics, compute the data to go into the chart and use the charting API to build the chart.  It is common to have several charts in the analytics pane, and this process can be repeated for each chart.

The use of nvd3 in charts in the config file is also the reason why the nvd3 js and css are frequently included in the html page.  If you don't need charts, you can remove those includes to speed up load times.

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

## Double Charts

Starting in version v0.24, charts can be compared side-by-side for two scenarios.  When you're looking at a chart for one scenario, this is still displayed in the sidebar under analytics, but the double map (comparison map) hides the analytic pane and adds a new menu item in the scenario drop down which lets you open up a modal to show side-by-side charts, one for each scenario.  To set up side-by-side charts, a few of the calls from above have to be aware of which panel they're being called from.

* chart configuration is split into `makeCharts` and `aggregateAnalytics` will be called twice with different sets of features.  if a `makeCharts` method is not present, then double charts will be hidden.
* `analyticsTemplate` should have a `{{panelNo}}` identifier to identify separate divs for each of the side-by-side charts
* `makeChart` will be called twice, once for each of the two charts.  It will be called with `agg`, `panelNo`, and `agg2` as parameters.  `agg` is the result from this panel's aggregation, `panelNo` is this panel number and can be used to find the right div from the template, and `agg2` is the result from the other panel's aggregation.  Both aggregations are passed so that results can be normalized between the panels, e.g. the scales can be set based on the ranges in both charts.

``` javascript
  makeCharts: function (agg, panelNo, agg2) {
    var data = [{
      key: "Building Types",
      values: [{
        label: "Garden Walkups",
        value: agg["Feasibility of Garden Walkups"]
      }, {
        label: "4 over 1",
        value: agg["Feasibility of 4 over 1 Podium"]
      }, {
        label: "Tower",
        value: agg["Feasibility of Tower"]
      }]
    }];

    // this sets the range to the max of both scenarios when doing a comparison
    var maxVal = Math.max(agg["Feasibility of Tower"], agg2["Feasibility of Tower"]);

    nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .forceY([0, maxVal])
        .staggerLabels(false);

      chart.yAxis
        .axisLabel('Count of Feasible Parcels');

      d3.select('#FeasibilityChart' + panelNo + ' svg')
        .datum(data)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });

    return agg;
  },

  aggregateAnalytics: function aggregate(features) {
    var cols = ['Feasibility of Tower', 'Feasibility of 4 over 1 Podium', 'Feasibility of Garden Walkups'];
    return _.object(_.map(cols, c => [
      c, d3.sum(features, o => o[c])
    ]));
  },

  analyticsTemplate: function () {
    return '<div id="FeasibilityChart{{panelNo}}"><h3 align="center"><b>Feasible Neighborhoods by Building Type</b></h3><svg style="height: 400px; width: 370px;"></svg></div>';
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

Thus to configure a second layer, specify a shapeUrl which is the geojson for the shapes and many of the same attributes from the main config object as shown below.  This will likely include which attributes to theme, which to edit, and so forth.  Once an object is built for the secondary layer, that object should be included in the main configuration object using the extraLayers attribute, which is an object where keys are layer names and values are layer configuration objects.  You should also provide a defaultLayerName, which is the name of the layer represented by the main configuration object, and will be used in the UI to switch back to the main overview map.

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

## Non-spatial Layers

Layers may also be non-spatial.  Here is an example of a working non-spatial layer.  The canonical use case is for zoning lookup data, which has attributes associated with it but which is not spatial until joined to parcels.  This works exactly the same way as all the other joined layers, except there are no shapes and so all data viewing and edits happen in the table.  In the config, set the nonSpatialLayer attribute to true and the UI will be configured to alert the user that there will be no shapes to view.  The data in this case will always be a csv.  For now, make sure to include "x" and "y" columns so the csv can be parsed the same way as csv files that contain point data, but for non-spatial layers the content of these columns will be ignored. 

```
config3 = {
  // study areas are selected via a dropdown of via map - if via map leave this empty
  shapeUrl: 'https://mapcraftlabs.github.io/seattle_parcels/seattle_zoning.csv',
  // property of the features which should be unique amont all features
  keyAttr: 'Zoning Name',
  csvLngLatcols: ["x", "y"],

  nonSpatialLayer: true,

  customMapAddFunction: function(shapes, featureLayer) {},

  typeMap: function () {
    return {
      'Max Dua': 'float',
      'Max Far': 'float'
    };
  },
  
  cols: [{
    InternalName: "Zoning Name",
    Variable: "Zoning Name",
    Group: "Zoning Attributes"
  }, {
    InternalName: "Max Dua",
    Variable: "Max Dua",
    Group: "Zoning Attributes"
  }, {
    InternalName: "Max Far",
    Variable: "Max Far",
    Group: "Zoning Attributes"
  }],

  tableColumns: function () {
    return helpers.getTableColumns(this.cols);
  },

  editableAttributes: function () {
    return helpers.inputGroupsFromJson(this.cols);
  },

  placeHeadingTemplate: "<h3 style='margin-top: 0px;'>{{p.name}}</h3>",
};
```

## App-wide Analysis

A key feature of the Tier 3 app is to do regional-level analysis.  This involves collating data from several places.  The data is layered on in a certain order, although the featureMergeFunction below allows the user to change the default priority.  By default, data is merged in the following way:

1.  Start with the feature from the original geojson data.  

2.  Override any attributes that have been edited within the app by the user using the latest value for each attribute.

3.  Iterate though each extra layer and include any attributes that have been set in that layer.  If any attributes are already present, use the value from the feature rather than the value from the layer (more specific value wins).

4.  Add any global attributes to the feature.  As above, if any attributes are already present, use the value from the feature rather than the value from the globals (more specific value wins).

5.  If the analysisDefaultInputs object is set, use these values to fill in additional defaults, but do not override existing values.

6.  Run the runAnalytics function on the object that results from the above steps.  Keep track of the results.  Allow the user to download separate csvs of the input and output attributes.  The separate csvs are only necessary because of memory limitations in the browser.

### Cloud Simulations

Starting around version v0.23 or so, we started using Amazon Lambda to allow running all of these computations on the server side.  The code and documentation for how that works are [here](https://github.com/mapcraftlabs/excelerator/tree/master/serverless), but the summary is that you can run all the analysis for each high level shape in a Lambda instance, and then can run hundreds of parallel instances to do all the calculations for an urban region.  From the Labs app perspective, all you need is the url to call, like so:

```
mapcraftCloudLink: "https://uflaubv3c8.execute-api.us-west-2.amazonaws.com/dev/austin",
```

### analysisDefaultInputs

These is the attribute descibed in steps 5 above.

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
```
