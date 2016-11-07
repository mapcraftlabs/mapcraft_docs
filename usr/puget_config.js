_ = null;

config = {

    setUnderscore (underscore) {
        _ = underscore;
    },

    firebasePath: 'puget',

    keepShapeEdges: true,

    defaultTheme: 'Most Feasible Option',

    onlySeeMyScenarios: true,

    playgroundScenario: true,

    aboutUrl: 'usr/about.md',

    showAboutModalNotLoggedIn: true,

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

    mapboxToken: 'pk.eyJ1IjoiZnNjb3R0Zm90aSIsImEiOiJLVHVqNHlNIn0.T0Ca4SWbbTc1p2jogYLQyA',

    formNoValidate: true,

    defaultScenario: 'Baseline',

    // default center location of the map
    center: [47.618484, -122.33345],
    // default zoom location of the map
    zoom: 13,

    studyAreas: {
        "Puget Sound Region": 'https://mapcraftlabs.github.io/seattle_parcels/seattle_neighborhoods.geojson',
    },
    defaultStudyArea: "Puget Sound Region",

    overviewShapes: null,
    overviewShapesIdAttr: null,

    baseMap: 'grey',

    keyAttr: 'NAME',

    debounceThemeEvery: 100,
    debounceAnalyticsEvery: 100,

    radioThemeChoice: true,

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

    themes: function () {
        var o = ss.getThemes(); 

        o['Most Feasible Option'] = {
            attr: 'Most Feasible Option',
            opacity: .9,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'categorical',
            categories: {
                'None Feasible': '#FF0000',
                'Walkups': '#71B35B',
                '4 over 1': '#45912C',
                'Tower': '#215C0D',
            }
        };

        _.each(["Tower", "4 over 1 Podium", "Garden Walkups"], function (k) {
            k += " Feasibility";
            o[k] = {
                attr: k,
                opacity: .9,
                outlineColor: '#000000',
                highlightColor: '#ffffcc',
                scaleType: 'categorical',
                categories: {
                    0: '#FF0000',
                    1: '#05AB05'
                }
            };
        })
        return o;
    },

    tableColumns: function () {
        return ss.getTableColumns();
    },

    editableAttributes: function () {
        return ss.getEditableAttributes();
    },

    globalAttributes: function () {
        return ss.getGlobalAttributes();  
    },

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

    // add analytics for a single feature
    runAnalytics(f, assumptions, accumulator) {

        var o = ss.doCalculation(f, assumptions, accumulator);

        if(o) {
            o.imageUrl = {
                'Tower': 'img/bldgs/LumaSeattle.jpg',
                '4 over 1': 'img/bldgs/PiazzaDelSolLA.jpg',
                'Walkups': 'img/bldgs/ApartmentComplex.jpg',
                'None Feasible': 'img/bldgs/undev_land.jpg'
            }[o['Most Feasible Option']];
        }

        return o;
    },

    analyticsTemplate: function () {
        return '<div id="FeasibilityChart"><h3 align="center"><b>Feasible Neighborhoods by Building Type</b></h3><svg style="height: 400px; width: 370px;"></svg></div>';
    },

    placeHeadingTemplate: "\
        <h3 style='margin-top: 0px;'>Neighborhood: {{p.NAME}}</h3>",

    hoverFeatureTemplate: function () {
        return ''+
            '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                    '<b>Most Feasible Option: {{p.[Most Feasible Option]}}</b>'+
                '</div>'+
                '<div class="panel-body">'+
                    "<img style='max-width: 100%; max-height: 400px;' src={{p.imageUrl}}></img>"+
                '</div>'+
            '</div>';
    }

};
