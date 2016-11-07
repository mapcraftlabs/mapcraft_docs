# MapCraft Labs

### What's the point of all this?

Put simply, the Labs app is a way to take workflows that were traditionally performed in Excel and move them to a multi-user modern website.  Since most of our use cases are spatial, users can go back and forth between interacting with the data on a map and in a table.  Oh, and we try and organize edits into scenarios so that different sets of input assumptions can be checked to see how they affect the output.

NOTE: this document expects some familiarity with how the app works - it doesn't explain the app, just how to configure it.

## Geting up and running

### Installation

Installation is pretty trivial.  A typical html file that leverages the app generally looks like the html below.  There are a few resources that get fetched over the web as these were hard to build into the app (usually they didn't have a good npm build).  Thus a lot of these includes are just kind of boilerplate and come from a CDN out there on the internet somewhere.

The exceptions are these:

* builds/bundle-v\*.js - this is the app - use the latest version or an appropriate version for your case.  It will be *minified* so won't be human readable.
* usr/sea_proforma.js - this is optional but is common - it's the real reason the app is built.  This is the translation of an Excel spreadsheet into Javascript for use within the website.
* lib/formula.standalone.js - this is a build we use of the open source [project](https://github.com/sutoiku/formula.js/) which implements all Excel formulas in Javascript.
* usr/sea_config.js - this is the configuration file which has a variable called `config` which is a configuration object which has keys which will be described one by one in this file.

Thus you only need the html file and these 4 files (and really two of the files are optional - the bundle and config are essential).  Thus you have 3 to 5 files on your local machine and all you need to test and edit the configuration is a web server.  I usually just run `python -m SimpleHTTPServer` and open up a browser and go to `http://localhost.com:800/whatever.html` - read more about it [here](http://www.2ality.com/2014/06/simple-http-server.html).

```html
<!DOCTYPE html>
<html>
<head>

<meta charset=utf-8 />

<title>MapCraft Labs</title>

<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />

<link href='https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.css' rel='stylesheet' />

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" />

<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.css' rel='stylesheet' />

<link href="https://bootswatch.com/cosmo/bootstrap.min.css" rel="stylesheet" />

<link href="http://adazzle.github.io/react-data-grid/build/react-data-grid.css" rel="stylesheet" />

</head>

<body>
<div id="app"></div>

<script src="https://api.mapbox.com/mapbox.js/v2.3.0/mapbox.js"></script>

<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.js'></script>

<script src="http://leaflet-extras.github.io/leaflet-providers/leaflet-providers.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>

<script src="lib/formula.standalone.js"></script>

<script src="http://cdn.jsdelivr.net/alasql/0.3/alasql.min.js"></script>

<script src="usr/sea_proforma.js"></script>
<script src="usr/sea_config.js"></script>
<script src="builds/bundle-v13.js"></script>

</body>
</html>
```

### A note on permissions

Permissions are mostly set in the app.  There are commenter, editor, and admin permissions which get set by adding a person's login email for a certain permission.  Importantly, there are a few universal admins (e.g. Ian and I), which can add new admins to each deployment.  We can add new universal admins if the time comes for that.

### Deployment

We pretty much use github pages for everything because it's convenient as hell and utterly free.  And of course it lets us roll back to previous versions because it's a version control system (obviously).  We'll host a GB or more worth of shapefiles on the gh-pages branch of some repo and we'll also end up hosting the html file, config file, and bundles there.  It's utterly easy to work with once you get fluent with git.

### Database

There is a database in the backend which is really more of cloud-based key-value store which is easy to interact with in Javascript.  It's called Firebase and you can read more about it [here](https://firebase.google.com/).  There is a whole data format which is relevant to writing the app but if everything goes right you don't really need to ever interact with the store - the app should take care of permissions and write relevant data out.  For the record, Firebase does make daily backups for us so we can revert to previous states if the users screw something up.

### Data in the app

One of the most confusing things about the app is how it stitches together all the data.  Base data is typically a parcel layer which can have 100s of thousands of shapes stored in geojson.  This is static and is hosted on github.  We then allow the user to edit certain attributes of those parcels for those shapes, but our guess is that users won't edit too many parcel attributes - maybe a few thousand at most.  So we start with the geojson files and apply the users edits on top on the fly (this isn't expensive because there's only a few thousand edits).

We can then join the parcels to other layers, like maybe a city-wide layer and census tract layer, and then apply any global attributes to all parcels.  In the end there can be dozens and dozens of attributes associated with each parcel which have come from different places in the app.

The data all gets passed into the spreadsheet and then results come out and the analytical reuslts are *also* added to the parcels.  This process can take a few seconds per 100k parcels, and the user can download pretty large csv files of inputs and outputs and explore the results in Tableau or Excel (and also inside the app).  And that's pretty much what the app does.

## And now here is a description of each of the keys in the config file

### firebasePath

First and foremost, each instance of Labs needs a unique firebasePath.  This is where the data gets stored on the backend.  **This is very important as you will be editing someone else's data if this isn't changed.**

```javascript
firebasePath: 'studyareas',
```

### firebase

This is all the info Firebase needs to connect.  If you're using the MapCraft Firebase instance, you can just copy paste this everytime.

```javascript
firebase(raw) {

    var config = {
        apiKey: "AIzaSyA3hpj39ADed_d0B4XnCBNMTtVndS0naj4",
        authDomain: "treasureisland.firebaseapp.com",
        databaseURL: "https://treasureisland.firebaseio.com",
        storageBucket: "project-4176592181288763552.appspot.com"
    };

    if(!this.firebaseConn)
        this.firebaseConn = firebase.initializeApp(config);

    if(raw)
        return this.firebaseConn;

    return this.firebaseConn.database().ref().child(this.firebasePath);
},
```

### setUnderscore

If you're gong to use underscore in the config files anywhere, this is a good way to make sure it gets set.  Outside of the object make sure to add a `_ = null;` in order to make `_` globally accessible to the config object.  I suppose you could also just include underscore somewhere, but this keeps from having to fetch it twice since it's included in the app.

```javascript
setUnderscore (underscore) {
    _ = underscore;
},
```

### aboutUrl

An about page for each deployment can be written in Markdown - this tells the app to include it and where it comes from.

```javascript
aboutUrl: 'usr/about.md',
```

### radioThemeChoice

This is usually used, and it allows the user to theme the map using radio buttons rather than a drop down menu, which is prettier (the radio button version is).  (Technically I don't think they're radio buttons anymore, but the theming interface usually seen in the app comes from this option.)  Should this be made the default and removed?  Maybe.

```javascript
radioThemeChoice: true,
```

### mapboxToken

This is a billing token for out mapbox tile, generally this token is always used.

```javascript
mapboxToken: 'pk.eyJ1IjoiZnNjb3R0Zm90aSIsImEiOiJLVHVqNHlNIn0.T0Ca4SWbbTc1p2jogYLQyA',
```

### defaultScenario

You can change the name of the default scenario.  By default the default scenario name is 'Baseline.'  This can be changed, e.g. when you're not really doing scenario planning, but rather just sharing results of an analysis for comment.

```javascript
defaultScenario: 'Baseline',
```

### keepShapeEdges

Normally when you zoom out beyond a certain zoom level, the outlines of the shapes will disappear.  This is appropriate for small shapes like parcels, but less appropriate for large shapes like city boundaries.  To keep shapes edges at all zoom levels, enable this attribute.

```javascript
keepShapeEdges: true,
```

### initialize

Hopefully this one is obvious.  Do anything you want to initialize your data in this method.  This is expected to take a while, so it's asynchronous and you need to call the callback when you're done with the initialization.  This is often used to load data and process it and store it in a global variable that would be accessible e.g. in the analytics methods.

```javascript
initialize (readyCallback) {

    var url = "https://oaklandanalytics.github.io/scratchpad/data/parcels.csv";

    d3.csv(url, function (data) {

        nestedParcels = d3.nest()
            .key(function (p) {
                return p.juris;
            })
            .entries(data);

        readyCallback();
    })
},
```

### center and zoom

This is the default center and zoom level of the map.  If you login and move around this isn't used much since the app always restores state, but is important because it's the user's first view.  As can be seen, center is a lat-lng array and zoom is a Leaflet zoom level.

```javascript
center: [37.823512, -122.318358],
zoom: 11,
```

### baseMap

This is the default basemap.  Current options are aerial, streets, grey, and dark.

```javascript
baseMap: 'aerial',
```

### keyAttr

This is a unique id on all the basic shapes.  The app will warn in the console if the id is not unique.  It's used in several places in the app (e.g. a key under which to store new place data), and it required.

```javascript
keyAttr: 'geom_id',
```

### debounceThemeEvery

This is the amount of time to wait before re-theming or re-computing the analytics.  It should be made longer if there are more shapes (and more computations), and shorter to keep things snappy if there are only a few shapes.

```javascript
debounceThemeEvery: 500,
debounceAnalyticsEvery: 500,
```

### studyAreas

If you **don't** want to use an overview map, you can use a dropdown list of study areas instead.  Just make a dictionary of key value pairs where keys are the study area names and values are the urls for the geojson.  

You may also set the default study area when doing this - otherwise the first key will be used as the default.

Finally, this is also how you create an app with a single shape layer (non-hierarchical).  To do that just use one key-value pair in this object.

```javascript
studyAreas: {
    "Ballard": "http://fscottfoti.github.io/pda_parcels/ballard.json",
    "Fremont": "http://fscottfoti.github.io/pda_parcels/fremont.json"
},
defaultStudyArea: "Ballard",
```

### overviewShapes

Alternatively you can use overviewShapes to select study areas on a map.  First you need to specifiy the overviewShapes url which gives the actual higher level shapes, then the overviewShapesIdAttr which is a unique attribute of the overview shapes which is used to select the study areas.  That attribute then gets passed to the overViewIdAttrToGeojson function which takes the attribute and uses it to build a url for the study area shapes.  Keep in mind the overviewShapesIdAttr will be displayed in the app so it should probably be human readable.

```javascript
overviewShapes: 'http://fscottfoti.github.io/pda_parcels/2016pdas.geojson',
overviewShapesIdAttr: 'joinkey',
overViewIdAttrToGeojson: function (attr) {
    return 'http://fscottfoti.github.io/pda_parcels/' + attr.toLowerCase() + '.json';
},
```

### defaultStyle and highlightStyle

These are the two most basic style specifications, one is the default style which will be shown when no theme is selected, and the highlightStyle which is applied to a shape that is selected or hovered over when no shape is selected.

```javascript
defaultStyle: {
    color: '#2262CC',
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.1,
    fillColor: '#2262CC'
},

highlightStyle: {
    color: '#2262CC', 
    weight: 3,
    opacity: 0.6,
    fillOpacity: 0.65,
    fillColor: '#2262CC'
},
```

### themes

This describes the themes that can be applied on the visible shape layer.  They are specified as an object where keys are the name of the theme (and will show up in the UI) and values are a spec used to define themes (which is Leaflet inspired but could also be used outside of Leaflet).  The themes should be familiar to anyone who has used GIS, but the spec is long enough that it has its own open source repo, and the docs can be found as the [README](https://github.com/mapcraftlabs/mapcraftjs) of that repo.


```javascript
themes: {
    'Residential Units': {
        attr: 'total_residential_units',
        opacity: .9,
        forceNumeric: true,
        outlineColor: '#000000',
        highlightColor: '#ffffcc',
        scaleType: 'linear',
        interpolate: ['#fff5eb', '#7f2704']
    },
    'Job Spaces': {
        attr: 'total_job_spaces',
        opacity: .9,
        forceNumeric: true,
        outlineColor: '#000000',
        highlightColor: '#ffffcc',
        scaleType: 'linear',
        interpolate: ['#f7fbff', '#08306b']
    },
    'Land Use': {
        attr: 'general_type',
        opacity: .9,
        outlineColor: '#000000',
        highlightColor: '#ffffcc',
        scaleType: 'categorical',
        categories: {
            'Office': '#ff9999',
            'Hotel': '#ff9933',
            'Retail': '#FF0000',
            'Residential': '#FFFF00',
            'Industrial': '#A020F0',
            'School': '#0000FF',
            'Vacant': '#FFFFFF',
            'Parking': '#666666'
        }
    }
},
```

### tableColumns

This describes how attributes of the shapes show up in the table.  This also uses an open source project called React Data Grid and so documentation for this spec is available [here](https://github.com/adazzle/react-data-grid).

This particular example runs a for loop over the attributes that are used in each theme and makes sure they are included in the table, but that is mainly used a default automatic specification.

```javascript
tableColumns: function () {
    var a = [
        {
            key: "geom_id",
            name: "GEOMID",
            locked : true,
            width: 200
        }
    ];

    var that = this;
    // just add all the attributes from the themes to the table
    _.each(_.keys(this.themes), function (key) {
        a.push({
            key: that.themes[key].attr,
            name: key,
            resizable: true,
            width: 200,
            sortable : true,
            filterable: true,
            editable : true                
        })
    });

    return a;
},
```

### editableAttributes

The editable attributes on each shape - e.g. what the form looks like that lets the user enter data.

The format is defined by an open source project described [here](https://github.com/mozilla-services/react-jsonschema-form).

Usually we return a list of such objects, and the app puts each element in the list as a separate form in an accordion for organization (so the entire form doesn't have to be viewed at once) (return a single object if you don't want an accordion).

```javascript
editableAttributes: function () {
    return [{
        type: 'object',
        header: 'Building Bulk',
        properties: {
            total_residential_units: {type: 'number', title: 'Residential Units'},
            total_job_spaces: {type: 'number', title: 'Job Spaces'},
            total_sqft: {type: 'number', title: 'Total Sqft'}
        }
    }, {
        type: 'object',
        header: 'Zoning',
        properties: {
            max_dua: {type: 'number', title: 'Max Dua'},
            max_far: {type: 'number', title: 'Max Far'}
        }
    },{
        type: 'object',
        header: 'Other',
        properties: {
            oldest_building: {minimum: 1920, maximum: 2016, type: 'number', title: 'Year Built'},
            general_type: {type: 'string', title: 'Land Use', enum: [
                'Office',
                'Hotel',
                'Retail',
                'Residential',
                'Industrial',
                'School',
                'Vacant',
                'Parking'
            ]}
        }
    }]
},
```

### editableAttributesFormat

This specifies how to format the form.  The most common use case is to use a slider (a "range") for a specific attribute.  You will need to define an object for each object in editableAttributes, so if the latter is a list, the former should be a list of the same length.

The format is defined by the [same](https://github.com/mozilla-services/react-jsonschema-form) open source project as editableAttributes.

This function also gets passed in the mobile attribute to change the format on your phone.  Surprisingly sliders don't work so well on the phone.

```javascript
editableAttributesFormat: function (mobile) {

    if(mobile) {
        return undefined;
    }

    return [{
        total_residential_units: {
            "ui:widget": "range"
        },
        total_job_spaces: {
            "ui:widget": "range"
        }
    }, {
        max_dua: {
            "ui:widget": "range"
        },
        max_far: {
            "ui:widget": "range"
        }
    }, {
        oldest_building: {
            "ui:widget": "range"
        }
    }]
},
```

### globalAttributes

This is the exact same format as the editableAttributes but these are attributes that apply for all the shapes - we call them "global" to all the shapes.  They are edited by the user in a different tab.  They are optional - to not have global attributes for a layer, just leave this undefined.

### globalAttributesFormat

globalAttributesFormat is to globalAttributes as editableAttributesFormat is to editableAttributes

## Analytics

The paradigm for the app is that analytics will be run per place and then aggregated.  `runAnalytics` is used to run analytics on each place and `aggregateAnalytics` is used to do the aggregation.  The outputs of runAnalytics will be available as context in the hover feature template and for theming, and the result of the aggregation will be used as context in the analytics pane using the analyticsTemplate.

### runAnalytics

For instance, attributes on a parcel may be edited, that data will be passed to a pro forma (which has been converted from Excel to Javascript), and certain attributes will be computed by the pro forma and added to the place.

The runAnalytics method is passed in the feature for which to calculate analytics (which will have any edits the user has made already applied), and a second object which is the global attributes for the current study area.  The method should return an object which is new attributes that will be added to this place (technically they will be added under the properties key as is standard with geojson).

```javascript
runAnalytics(f, assumptions) {

    // global assumptions, hard coded for now, but
    // will be entered by the user
    var defaultGlobals = {
        constructCost: 185, // $/SqFt hard cost
        softCost: 40, // % of hard cost
        capRate: 4.5,
        goInCapSpread: 20, // % over blended CAP
        inclusionary: 20, // % of Res sq ft
        affDepth: 60 // % of AMI
    };

    var defaults = {
        rentSqftRes: 4, // $/SqFt/month
        rentSqftComm: 20, // $/SqFt/year NNN
        maxDua: 0,
        maxFar: 0,
        landPrep: 0
    };

    assumptions = _.extend(defaultGlobals, assumptions); 

    var p = f.properties;

    // do the pro forma
    return ROCpencil(p, assumptions);
},
```

### aggregateAnalytics

aggregateAnalytics is run on the output after calling `runAnalytics` above on each place.  The result is passed as the first object as seen below, and the second parameter is a callback which should be called in order to return output asynchronously (this assumes this method might take a while).

d3 is usually used to do the aggregation which can be sum, mediam, mean, or anything else that d3 supports.

```javascript
aggregateAnalytics: function (features, callback) {
    var v = {
        'raw_residential_capacity': d3.sum(features, function (v) {
            return v.properties.max_dua * v.properties.parcel_acres;
        }),
        'raw_non_residential_capacity': d3.sum(features, function (v) {
            return v.properties.max_far * v.properties.parcel_acres * 43560;
        }),
        'total_residential_units': d3.sum(features, function (v) {
            return v.properties.total_residential_units;
        }),
        'total_job_spaces': d3.sum(features, function (v) {
            return v.properties.total_job_spaces;
        }),
        'total_acres': d3.sum(features, function (v) {
            return v.properties.parcel_acres;
        })
    };

    // asynchronous
    callback(v);
},
```

## HTML Templates

The following parameters actually define how to display different parts of the app.  They do this by using a [handlebars.js](http://handlebarsjs.com/) template and passing in some data as context.  There are also some helper functions that can be used in these templates, like the formatNumber helper which, you guessed it, is used format numbers.

The `formatNumber` helper used [numeral.js](http://numeraljs.com/) format strings.  You can also pass in a default value using `default=` and the helper will divide by 1,000 if `inThousands=1` is passed or by 1,000,000 if `inMillions=1` is passed.

*Another useful thing to keep in mind is that it's very easy to misformat the config.js file using these templates.  To do a multi-line string in Javascript, you have to use the backslash character at the very end of the line as shown below.  Do not have spaces after the backslash or the Javascript will not parse correctly.*

### analyticsTemplate

The analytics template is the template shown in the analytics pane of the app.  The context will be an object called `analytics` and that object is created by the `aggregateAnalytics` function described above. 

```javascript
analyticsTemplate: "\
    <div style='font-size: 18px'>\
        <h4 style='margin-top: 0px;'><b>Data Summary</b></h4>\
        <p>\
            <em><b>Basic Metrics</b></em><br/>\
            Total Residential Units: {{ formatNumber analytics.total_residential_units '0,0' default=0 }}<br/>\
            Total Job Spaces: {{ formatNumber analytics.total_job_spaces '0,0' default=0 }}<br/>\
        </p>\
        <p>\
            <em><b>Capacity Input</b></em><br/>\
            Total Acres: {{ formatNumber analytics.total_acres '0,0.0' default=0 }}<br/>\
            Raw Residential Capacity: {{ formatNumber analytics.raw_residential_capacity '0,0' default=0 }} Units<br/>\
            Raw Commercial Capacity: {{ formatNumber analytics.raw_non_residential_capacity '0,0.0' inMillions=1 default=0 }}M Sqft\
       </p>\
    </div>",
```

### placeHeadingTemplate

The placeHeadingTemplate is the templat used above the form which edits place attributes.  It is usually very short and might just display the place name or id attribute.  The object called `p` has all the place properties for the place currently being edited.

```javascript
placeHeadingTemplate: "\
    <h3 style='margin-top: 0px;'>Parcel Id: {{p.geom_id}}</h3>",
```

### hoverFeatureTemplate

The hover feature template is shown under the "Places" tab when no place is currently selected.  It is used to describe attributes of the place currently under the mouse pointer, and will change as the mouse moves.  The object called `p` has all the place properties for the place currently under the mouse pointer.

```javascript
hoverFeatureTemplate: "\
    <p style='font-size: 18px'>\
        <b><i>Parcel Id: {{p.geom_id}}</i></b><br/>\
        Residential Units: {{formatNumber p.total_residential_units '0,0' default=0}}<br/>\
        Job Spaces: {{formatNumber p.total_job_spaces '0,0' default=0}}<br/>\
        Total Sqft: {{formatNumber p.total_sqft '0,0.0' inThousands=1 default=0}}k<br/>\
        Year Built: {{p.oldest_building}}<br/>\
        Max Dua: {{formatNumber p.max_dua '0,0' default=0}}<br/>\
        Max Far: {{formatNumber p.max_far '0,0.0' default=0}}<br/>\
        Height: {{p.height}}<br/>\
        SDEM: {{p.sdem}}<br/>\
        General Type: {{p.general_type}}<br/>\
        Zoned DU: {{p.zoned_du}}, \
        Zoned DU Underbuild: {{p.zoned_du_underbuild}}<br/>\
        Zoning Name: {{p.zoning_name}}\
    </p>"
```
