_ = null;

var defaultRadiusRange = [5, 10];

// round it to one decimal
function round(f, decimals) {
    var factor = Math.pow(10, decimals || 0);
    return Math.round(f*factor) / factor;
}

/*
add pct of total aggregations
add a chart of units by vmt category
add a chart by units in pda or not
add a chart by inits in tpp or not
*/

// this is the csv of parcel data that is used only in the analytics
var nestedParcels = undefined;

config = {

    initialize (readyCallback) {

        var url = "http://oaklandanalytics.github.io/scratchpad/data/parcels.csv";

        d3.csv(url, function (data) {

            console.log(data[0]);

            nestedParcels = d3.nest()
                .key(function (p) {
                    return p.juris;
                })
                .entries(data);

            readyCallback();
        })
    },

    setUnderscore (underscore) {
        _ = underscore;
    },

    radioThemeChoice: true,

    keepShapeEdges: true,

    firebasePath: 'baus_regional',

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

    defaultScenario: 'Baseline',

    center: [37.823512, -122.318358],
    zoom: 11,

    studyAreas: {
        "Redev Area": 'http://fscottfoti.github.io/pda_parcels/cities.geojson'
    },
    defaultStudyArea: "Redev Area",

    baseMap: 'aerial',

    keyAttr: 'NAME10',

    debounceThemeEvery: 500,
    debounceAnalyticsEvery: 500,

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

    themes: {
        'Residential Units': {
            attr: 'residential_units',
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#fff5eb', '#7f2704']
        },
        'Comm Sqft': {
            attr: 'non_residential_sqft',
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#f7fbff', '#08306b']
        },
        'Total Sqft': {
            attr: 'building_sqft',
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#e5f5f9', '#2ca25f']
        },
        'Zillow Price / Sqft': {
            attr: 'zillow_price_per_sqft',
            opacity: .9,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#fff5eb', '#7f2704']
        },
        'Zoned Units': {
            attr: 'zonedUnits',
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#fff5eb', '#7f2704']
        },
        'Feasible Units': {
            attr: 'feasibleUnits',
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#fff5eb', '#7f2704']
        },
        'Feasible Profit': {
            attr: 'feasibleProfit',
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#fff5eb', '#7f2704']
        }          
    },

    tableColumns: function () {
        var a = [
            {
                key: "parcel_id",
                name: "Parcel Id",
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

    editableAttributesFormat: function (mobile) {
        
        if(mobile) {
            return undefined;
        }

        return {
        }
    },

    editableAttributes: function () {
        // use react-jsonschema-form style syntax
        // https://github.com/mozilla-services/react-jsonschema-form
        return {
            type: "object",
            header: "Globals",
            properties: {
                priceFactor: {type: 'number', title: 'Price Factor'},
                sqftPerUnit: {type: 'number', title: 'Sqft Per Unit'},
                constructionCostSqft: {type: 'number', title: 'Construction Cost / Sqft'},
                maxDuaOverride: {type: 'number', title: 'Max Dua Override'}
            }
        }
    },

    globalAttributesFormat: function (mobile) {

        if(mobile) {
            return undefined;
        }

        return {
        }
    },

    globalAttributes: function () {
        return {
            type: "object",
            header: "Globals",
            properties: {
                feasibleThreshold: {type: 'number', title: 'Feasible Threshold'},
                priceFactor: {type: 'number', title: 'Price Factor'},
                sqftPerUnit: {type: 'number', title: 'Sqft Per Unit'},
                nonResToRes: {type: 'number', title: 'Non-res to Units'},
                landPriceRatio: {type: 'number', title: 'Land Price Ratio'},
                existingBuildingQualityRatio: {type: 'number', title: 'Existing Building Quality Ratio'},
                constructionCostSqft: {type: 'number', title: 'Construction Cost / Sqft'},
                maxDuaOverride: {type: 'number', title: 'Max Dua Override'}
            }
        }
    },

    aggregateAnalytics: function (features, callback) {

        var v = {
            'totalCurrentUnits': d3.sum(features, function (v) {
                return v.properties.residential_units;
            }),
            'totalCommSqft': d3.sum(features, function (v) {
                return v.properties.non_residential_sqft;
            }),
            'totalZonedUnits': d3.sum(features, function (v) {
                return v.properties.zonedUnits;
            }),
            'totalFeasibleUnits': d3.sum(features, function (v) {
                return v.properties.feasibleUnits;
            }),
            'totalProfit': d3.sum(features, function (v) {
                return v.properties.feasibleProfit;
            })
        }

        // asynchronous
        callback(v);
    },

    // add analytics for a single feature
    runAnalytics(f, g) { // passed in feature and global assumptions, both objects

        if(!nestedParcels) return {};

        // get the parcel data for this city
        var city = _.findWhere(nestedParcels, {key: f._id}).values;

        var g = _.extend({}, g, f.properties);

        // run analytics on each parcel
        city = _.map(city, function (p) {
            return _.extend(p, config.proForma(p, g));
        });

        // run city-wide aggregations
        var v = {
            'residential_units': d3.sum(city, function (p) {
                return p.residential_units;
            }),
            'building_sqft': d3.sum(city, function (p) {
                return p.building_sqft;
            }),            
            'zillow_price_per_sqft': d3.mean(city, function (p) {
                return p.zillow_price_per_sqft;
            }),
            'non_residential_sqft': d3.sum(city, function (p) {
                return p.non_residential_sqft;
            }),
            'zonedUnits': d3.sum(city, function (p) {
                return p.zonedUnits;
            }),
            'feasibleUnits': d3.sum(city, function (p) {
                return p.feasibleUnits;
            }),
            'feasibleProfit': d3.sum(city, function (p) {
                return p.feasibleProfit;
            })            
        };

        _.each(_.keys(v), function (k) {
            v[k] = round(v[k], 0);
        })

        return v;
    },

    proForma(p, g) {

        // editable props in g
        // sqftPerUnit
        // nonResToRes
        // priceFactor
        // landPriceRatio
        // existingBuildingQualityRatio
        // constructionCostRatio
        // feasibleThreshold

        // editable props in f
        // max_dua
        // priceFactor

        // non-editable props in f
        // parcel_size
        // residential_units
        // non_residential_sqft
        // zillow_price_per_sqft

        var sqftPerUnit = g.sqftPerUnit || 1000; // sqft per unit
        var nonResToRes = g.nonResToRes || 1250; // this many non-res sqft = a res unit
        var acres = p.parcel_size / 43560;

        function ifNotDefined(v1, v2) {
            // zero is ok as a value, undefined is not, so can't do v1 || v2
            return v1 !== undefined ? v1 : v2;
        }
        var max_dua = g.maxDuaOverride || p.max_dua; 

        // acres x dus per acre
        var possibleNewUnits = acres * max_dua * +(p.residential_is_allowed == "True");

        // use the equivalence of non-res to res to account for both
        var oldUnits = p.residential_units + p.non_residential_sqft / nonResToRes;

        var price = p.zillow_price_per_sqft * ifNotDefined(g.priceFactor, 1.0);

        // revenue is number of unit x sqft per unit x price per sqft
        var revenue = possibleNewUnits * sqftPerUnit * price;

        // account for land price as a ratio of built price
        var landPriceRatio = g.landPriceRatio || .1;
        // current buildings will not be as high quality as new construction
        var existingBuildingQualityRatio = g.existingBuildingQualityRatio || .8

        // buy the building and the land
        var acquisitionCost = oldUnits * sqftPerUnit * price * existingBuildingQualityRatio + 
            p.parcel_size * landPriceRatio * price;

        // ratio of construction cost to price
        var constructionCostSqft = g.constructionCostSqft || 400;
        // cost to build the building
        var constructionCost = possibleNewUnits * sqftPerUnit * constructionCostSqft;
        
        // sum costs
        var cost = acquisitionCost + constructionCost;

        // compute return on consts as simple ROI
        var profit = revenue - cost;
        var returnOnCost = profit / cost;

        var returnOnCost = round(returnOnCost, 2)

        // return on cost has to be this number for units to be feasible
        var feasibleThreshold = g.feasibleThreshold || .3;

        var feasibleUnits = possibleNewUnits * (returnOnCost > feasibleThreshold);
        feasibleUnits = round(feasibleUnits, 2);

        var feasibleProfit = profit * (returnOnCost > feasibleThreshold);
        feasibleProfit = round(feasibleProfit, -5);

        return {
            ROC: returnOnCost || 0,
            acres: acres,
            zonedUnits: possibleNewUnits,
            revenue: revenue,
            profit: profit,
            acquisitionCost: acquisitionCost,
            constructionCost: constructionCost,
            feasibleUnits: feasibleUnits,
            feasibleProfit: feasibleProfit
        }
    },

    analyticsTemplate: "\
        <div style='font-size: 18px'>\
            <h4 style='margin-top: 0px;'><b>Regional Summary</b></h4><small>(Only 471k parcels which are considered for residential included)</small>\
            <p>\
                <em><b>\
                Current Units: {{ formatNumber analytics.totalCurrentUnits '0,0.00' inMillions=1 default=0 }}M<br/>\
                Current Comm Sqft: {{ formatNumber analytics.totalCommSqft '0,0.00' inMillions=1 default=0 }}M<br/>\
                Zoned Units: {{ formatNumber analytics.totalZonedUnits '0,0.00' inMillions=1 default=0 }}M<br/>\
                Feasible Units: {{ formatNumber analytics.totalFeasibleUnits '0,0.00' inMillions=1 default=0 }}M<br/>\
                Profit in Feasible Units: ${{ formatNumber analytics.totalProfit '0,0' inMillions=1 default=0 }}M<br/>\
                </em></b>\
            </p>\
        </div>",

    placeHeadingTemplate: "\
        <h3 style='margin-top: 0px;'>Parcel Id: {{p.parcel_id}}</h3>",

    hoverFeatureTemplate: "\
        <p style='font-size: 25px'>\
            <b><i>City: {{p.NAME10}}</i></b><br/>\
            Residential Units: {{formatNumber p.residential_units '0,0.0' inThousands=1 default=0}}k<br/>\
            Comm Sqft: {{formatNumber p.non_residential_sqft '0,0.0' inMillions=1 default=0}}M<br/>\
            Total Sqft: {{formatNumber p.building_sqft '0,0.0.0' inMillions=1 default=0}}M<br/>\
            Zoned Units: {{formatNumber p.zonedUnits '0.0' inThousands=1 default=0}}k<br/>\
            Feasible Units: {{formatNumber p.feasibleUnits '0' default=0}}<br/>\
            Profit: {{formatNumber p.feasibleProfit '0,0.00' inMillions=1 default=0}}M<br/>\
         </p>"

};
