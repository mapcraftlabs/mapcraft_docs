# Chart API
You can add charts to the lab using data from the inputs and outputs. Charts appear in their own tab (Analytics) and can be rendered at the area/region level, as well as the shape level.

Instead of writing code to build a chart, you can define an array of JS objects:
```javascript
[{
  type: 'bar',
  title: 'My Chart Title',
  datum: data
}, {
  type: 'histogram',
  title: 'Some Histogram Chart',
  datum: data
}];
```

## Source
The chart API is implemented [here](https://github.com/mapcraftlabs/labs/blob/master/app/utils/mc_chart.jsx)

It wraps the [NVD3 framework](http://nvd3.org/), and thus follows many of its conventions.

## Usage
The chart config object needs to be defined in an array, and each object represents a single chart that will appear in the same order inside the Analytics tab. There are two hooks available to you within the lab configurations:

### Areawide
Use the areaCharts hook. This function is called by labs and passes in the results from aggregateAnalytics:
```javascript
// where layerConfig is your particular Map Craft layer
layerConfig.areaCharts = (analytics) => {
    return [{
        type: 'bar',
        title: 'Median Price Data',
        width: 380,
        height: 400,
        margin: {bottom: 180, left: 60},
        formatY: d3.format('.2s'),
        labelY: 'Median Price ($)',
        rotateXLabels: '90',
        datum: [{label: 'Region A', value: 340},
                {label: 'Region B', value: 240},
                {label: 'Region C', value: 140}]
      }
    ]};
    // this renders a single bar chart
```
NOTE:  For areawide, you'll first have to define the aggregateAnalytics. This behaves it always has. The results from this hook are passed into ```areaCharts()``` You can reference the analytics data to populate the datum property. The function must return an array of config objects (even it's only one item). You stack charts in the sidebar.
```Javascript
TPAConfig.areaCharts = (analytics) => {
    let areaChartConfig = [
      {
        type: 'bar',
        title: 'Median Price Data',
        width: 380,
        height: 400,
        margin: {bottom: 180, left: 60},
        formatY: d3.format('.2s'),
        labelY: 'Median Price ($)',
        rotateXLabels: '90',
        datum: analytics.median_price_data
      },
      {
        type: 'pie',
        title: 'BART vs non-BART',
        showLegend: false,
        donut: true,
        width: '380',
        height: '400',
        color: ['purple', 'green'],
        datum: pieData
      },
      {
        type: 'hist',
        title: 'Square Footage Distribution',
        width: 330,
        height: 450,
        margin: {left: 60, top: 20, right: 10, bottom: 60},
        rotateXLabels: '45',
        color: ['teal'],
        labelY: 'count',
        labelX: 'Sqft Range',
        formatY: d3.format(',d'),
        formatX: d3.format(".0f"),
        datum: analytics.histSqft
      },
      {
        type: 'table',
        title: 'Station Data',
        datum: tableData
      }
    ];
  }
```
The above config would render a bar chart, pie chart, histogram and a table of data defined in tableData. There's no need to think about the DOM, the API does that for you.

### Shape or Place Level
Use the `makePlaceCharts` hook. This function is called by labs and passes in the feature data for the selected shape:
```javascript
// where layerConfig is your particular Map Craft layer
layerConfig.makePlaceCharts = (feature) => {
    if (!feature) return [];

    return [
      {
        type: 'bar',
        title: `Median Price Data for ${feature.transit_name}`,
        width: 350,
        height: 320,
        // margin: {left: 50},
        formatY: d3.format('.4f'),
        labelY: '%',
        labelX: 'Built FAR',
        // color: ['red', 'green', 'blue'],
        datum: [{label: 'Built FAR 15', value: feature.built_far_15},
                {label: 'Built FAR 50', value: feature.built_far_50},
                {label: 'Built FAR 85', value: feature.built_far_85}]
      },{
        type: 'stacked-bar',
        title: 'Test Stacked Bar',
        width: 370,
        height: 380,
        labelX: 'Model',
        labelY: 'USD ($)',
        color: ['green', 'blue', 'orange'],
        datum: groupStackData
      }];
    }
```
The `groupStackData` is where you pass your data, and needs to be defined before making this call.

### Complete Examples
An exhaustive set of [examples](https://github.com/mapcraftlabs/labs/blob/356dfadc8fce4eb58bd2aac99643c30a88b28161/sb827.html)

## Reference
<span style="color: red">* indicates required</span>
#### type <span style="color: red">*</span>
* The type of chart to render. Options...
* bar
* stacked-bar
* grouped-bar
* hist
* pie
* table
* manual

#### title
* Title to appear above graph
#### width
* Width of the chart. Defaults to 25% of `window.innerWidth`.
#### height
* Height of chart. Defaults to 33% of `window.innerHeight`.
#### margin
* Follows [d3 margin convention](https://bl.ocks.org/mbostock/3019563)
* {left: 20, right: 20, top: 30, bottom: 50}
* Extend the bottom margin when you rotate labels
#### labelX
* Text label for x-axis
* Could be dynamic...  `labelX: feature.name + ' Station'`
#### labelY
* Same as labelX but for y-axis
#### formatX
* Format mask for x-axis values
* Use d3.format(), eg. `formatX: d3.format('2f')`
* See [here](https://github.com/d3/d3-format) for how to use the d3.format()
#### formatY
* Same as formatX, but for Y-Axis data.
#### color
* Array of colors which will automatically be mapped to array in datum.
#### rotateXLabels
* Rotate the labels on the x-axis by n degrees so they're not smushed.
* `rotateXLabels: 45` (make sure to specify as number and not string ("45")
#### datum <span style="color: red">*</span>
This is your actual data, and the format required varies by chart type.
* For bar and pie charts, pass in an array of nested object pairs where each element represents a single bar or slice (pie), respectively:
	* `datum: [{label: 'Zone A', value: 34}, {label: 'Zone B', value: 12}, {label: 'Zone C', value: 50}]`
	* Use a `_.map()` to produce an array using data from your analytics or feature:
	* `datum: _.map(someAnaltyic, (d) => { return {label: d.key, value: d.values} })`
* For histograms, simply put all the values into an array, and the histogram chart will figure out the ideal distribution bucket sizes:
	* `datum: [23 ,43, 12, 19, 20, 87, 65, 34, ... ]`
* For the table type, pass in a two-dimensional array. Think of each child array as a row in the table, so the first row is a header.
	* `datum: [[ColA, ColB, ColC], [32, 18, 12], [98, 48, 34], ...]`
	* Of course, you can use data from analytics (areawide) or feature (place level) here to render your table.
* The datum for grouped-bar and stacked-bar charts is the most complicated. As with the bar and pie charts, it requires an array of object pairs, `key` and `values` in which the `values` is also a nested array of object pairs. The parent object pair represents a single stacked or grouped bar, depending on which option you're using. The child object pair under `values` is represented with `x` and `y` and represents a slice of bar (stacked) or a separate bar (grouped). This grouped vs stacked difference is really just syntactic sugar for NVD3's multiBarChart type.

That's probably confusing, so here's an example...
```
let groupStackData = [{
          key: '$ to Land Purchase',
          values: [{x: 'Static Midrise', y:  getRand()},
                   {x: 'Static Highrise', y: getRand()},
                   {x: 'Flexible Model', y: getRand()}
                  ]
                },
          {
          key: '$ Land Shortfall',
          values: [{x: 'Static Midrise', y:  getRand()},
                   {x: 'Static Highrise', y: getRand()},
                   {x: 'Flexible Model', y: getRand()}
                  ]
          },
          {
          key: 'Excess $ to District',
          values: [{x: 'Static Midrise', y:  getRand()},
                   {x: 'Static Highrise', y: getRand()},
                   {x: 'Flexible Model', y: getRand()}
                  ]
          }];
```
Checkout the [sb827.html](https://github.com/mapcraftlabs/labs/blob/356dfadc8fce4eb58bd2aac99643c30a88b28161/sb827.html) lab in the mapcraft/labs repo to see this in action.

#### donut
* Only applicable on pie charts. False by default, but will render an inner radius to the pie chart if set to true (making a donut)

#### showLegend
* Applicable for charts that have legends. True by default

### Manual Charts
If the chart API doesn't render something you need, there's a manual option to build your own custom graph. You're responsible for all rendering and sizing of the chart, but you are guaranteed a spot in the sidebar without having to thinking about the DOM. The chart API will call your draw function and pass it the DOM element allocated for the graph. Note: This is the actual element reference and not the CSS selector. So, don't take the name and do something like... `d3.select('#name')`. Just select it... `d3.select(name)` or if using something like chartJS...
```
// ctx is the DOM element resulting from document.getElementById()
var myChart = new Chart(ctx, config)
```

Additional guidance on using manual charts:

First create a draw function using your chart library of choice. The one below uses NVD3. You will be given the DOM element reference, so you can put whatever you want using JS:

```
const manualDrawFunc = (el) => {
            nv.addGraph(function() {
            var chart = nv.models.scatterChart()
                          .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
                          .showDistY(true)
                          .height(500)
                          .width(400)
                          .margin({left: 10})
                          .color(d3.scale.category10().range());

            //Axis settings
            chart.xAxis.tickFormat(d3.format('.02f'));
            chart.yAxis.tickFormat(d3.format('.02f'));

            var myData = randomData(4,40);
            d3.select(el).select('svg').attr({ width: 400, height: 500 })
                .datum(myData)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
          });
          }
```
Inside your chart hook, define the object config for this chart as such:
```
{
  type: 'manual',
  title: 'Scatterplot Demo',
  draw: manualDrawFunc
}
```
