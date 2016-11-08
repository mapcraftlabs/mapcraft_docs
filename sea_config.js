// boilerplate
_ = null;

// create json form spec from possible input fields
// (they are grouped as specified in the excel spreadsheet)
var helpers = {

    inputGroupsFromJson: function (d) {

        // https://github.com/mozilla-services/react-jsonschema-form
        // use react-jsonschema-form style syntax

        var groups = [];
        var grpHeaders = _.uniq(_.pluck(d, 'Group'));

        var that = this;

        grpHeaders.forEach(function (header) {

            var items = _.where(d, {'Group': header});

            var object = _.object(_.map(items, function (o) {
                return [o.InternalName, { type: 'string', title: o.Variable}];
            }));

            var group = {
                type: 'object',
                header: header,
                properties: object
            };

            groups.push(group);

        });

        return groups;
    }, 

    getThemes: function (obj) {

        themes = {};

        obj.forEach(function (l) {
            themes[l.InternalName] = {
                attr: l.InternalName,
                legendName: l.Variable,
                opacity: .9,
                forceNumeric: true,
                outlineColor: '#000000',
                highlightColor: '#ffffcc',
                scaleType: 'linear',
                interpolate: ['#fff5eb', '#7f2704']
            };
        });

        return themes;

    },

    getTableColumns: function (obj) {

        var cols = []

        obj.forEach(function (l) {
            cols.push({
                key: l.InternalName,
                name: l.Variable,
                resizable: true,
                width: 300,
                sortable : true,
                editable: true
            });
        });

        return cols;

    },

    formatData: function (objectName, variableName, format, type) {

        if(type == 'string')
            return variableName+': {{'+objectName+'.['+variableName+']}}<br/>';

        if(format == undefined) format = "0";

        var endChar = "",
            inMillions = "";

        if(format.endsWith("M")) {
            format = format.slice(0, -1);
            endChar = "M";
            inMillions = "inMillions=1";
        }

        if(format.endsWith("k")) {
            format = format.slice(0, -1);
            endChar = "k";
            inMillions = "inThousands=1";
        }

        if(type == 'percent')
            endChar = "%";

        return variableName+': {{formatNumber '+objectName+'.['+variableName+'] \''+format+'\' default=0 '+inMillions+' }}'+endChar+'<br/>';
    },

    getDefaultHoverFeature: function (obj) {

        s = "<p style='font-size: 18px'>";

        s += "<b><i>Attributes</i></b><br/>";

        var that = this;
        obj.forEach(function (o) {
            s += that.formatData('p', o.InternalName, o.NmbrFmt, o.Type);
        });

        s += "</p>";

        return s;

    }
};

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


config = {

    /* things to fix
    parenthesis in the pro forma code (tell ian cell 407 has missing 3rd agument and this breaks things)
    sheetname embedded in the helpers code
    mapping geojson field names to excel field names
    taking out toronto specific things from helpers
    */

    // boilerplate
    setUnderscore (underscore) {
        _ = underscore;
    },

    // markdown relative url for the about page
    aboutUrl: 'usr/about.md',

    // mapbox token to pay for basemaps
    mapboxToken: 'pk.eyJ1IjoiZnNjb3R0Zm90aSIsImEiOiJLVHVqNHlNIn0.T0Ca4SWbbTc1p2jogYLQyA',

    // name of the default / baseline scenario
    defaultScenario: 'Baseline',
 
    // boolean choise for whether theme selection is a dropdown or radio button
    radioThemeChoice: true,

    // the path to the firebase app - should be unique among apps - describes where to
    // keep the data for this instance
    firebasePath: 'seattle',

    // this is basically boilerplate - sets up the firebase connection which is the same
    // for all the current apps
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

    defaultLayerName: "Parcels",
    extraLayers: {
        "Neighborhoods": config2
    },

    // default center location of the map
    center: [47.618484, -122.33345],
    // default zoom location of the map
    zoom: 13,

    // study areas are selected via a dropdown of via map - if via map leave this empty
    studyAreas: {},

    // this is the geojson for overview map used to select invidual study areas
    overviewShapes: 'https://mapcraftlabs.github.io/seattle_parcels/seattle_neighborhoods.geojson',
    // the attribute in the overview geojson that gets passed to the function below
    overviewShapesIdAttr: 'NAME',
    // the function that maps that attribute to a url which has those shapes
    overViewIdAttrToGeojson: function (attr) {
        return 'https://mapcraftlabs.github.io/seattle_parcels/' + attr + '.geojson';
    },

    // default basemap type
    baseMap: 'aerial',

    // property of the features which should be unique amont all features
    keyAttr: 'PIN',

    // theme gets recalculated every this many milliseconds
    debounceThemeEvery: 150,
    // analytics gets recalculated every this many milliseconds
    debounceAnalyticsEvery: 150,

    // default style for features before selecting a theme
    // styles follow the spec at: XXX
    defaultStyle: {
        color: '#2262CC',
        weight: 2,
        opacity: 0.6,
        fillOpacity: 0.1,
        fillColor: '#2262CC'
    },

    // default highlight style for features before selecting a theme
    // styles follow the spec at: XXX
    highlightStyle: {
        color: '#2262CC', 
        weight: 3,
        opacity: 0.6,
        fillOpacity: 0.65,
        fillColor: '#2262CC'
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

    getRows: function () {
        return _.where(PROFORMA_INPUTS, {'Layer': 'Parcel'});
    },

    formatLabel: function (attr) {
        var o = _.where(PROFORMA_INPUTS, {'InternalName': attr})[0];
        if(!o) o = _.where(PROFORMA_OUTPUTS, {'InternalName': attr})[0];
        return helpers.formatData('p', o.InternalName, o.NmbrFmt, o.Type);
    },

    themes: function () {
        var themes = helpers.getThemes(this.getRows());
        var outThemes = helpers.getThemes(PROFORMA_OUTPUTS);
        themes = _.extend(themes, outThemes);

        // replace land use with categorical theme
        themes['Land Use'] = {
            attr: 'Land Use',
            opacity: .9,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'categorical',
            forceNumeric: false,
            categories: {
                'C1': '#ff9999',
                'C9': '#ff9999',
                'CF': '#ff9999',
                'CL': '#ff9999',
                'H1': '#ff9933',
                'R1': '#FFFF00',
                'R2': '#FFFF00',
                'R3': '#FFFF00',
                'R4': '#FFFF00',
                'I1': '#A020F0',
                'P1': '#666666',
                'P2': '#666666',
                'P3': '#666666',
                'P4': '#666666',
                'P5': '#666666',
                'P6': '#666666',
                'P7': '#666666',
                'P8': '#666666',
                'A1': '#FFFFFF',
                'A2': '#FFFFFF'
            }
        };

        themes['Most Feasible Option'] = {
            attr: 'Most Feasible Option',
            opacity: .9,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'categorical',
            forceNumeric: false,
            categories: {
                'Tower': '#ff9999',
                'Garden Walkups': '#FFFF00',
                '4 over 1 Podium': '#A020F0'
            }
        };

        return themes;
    },

    tableColumns: function () {
        return helpers.getTableColumns(this.getRows());
    },

    fieldNameMap: function () {
        return {
            APPRLNDVAL: 'Land Value',
            APPR_IMPR: 'Improvement Value',
            SITETYPE: 'Land Use',
            Shape_area: 'Parcel Size'
        }
    },

    editableAttributes: function () {
        return helpers.inputGroupsFromJson(this.getRows());
    },

    globalAttributes: undefined,

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

    aggregateAnalytics: function () {
        return {};
    },

    runAnalytics: function (f, assumptions, layerData) {

        var merge = config.featureMergeFunction(f.properties, layerData);
        var out = config.analysisFunction(merge);

        // a little debug to check merge in seattle demo
        if(f.properties.PIN == '1985200003') console.log(merge, out);

        return out;
    },
 
    placeHeadingTemplate: "\
        <h3 style='margin-top: 0px;'>PIN: {{p.PIN}}</h3>",

    hoverFeatureTemplate: function () {
        return helpers.getDefaultHoverFeature(this.getRows());
    }
};
