# MapCraft Configuration: Aggregations

Aggregations are configured with a list of objects which have the form:

- `attribute` - name of the attribute to aggregation
- `outputName` - output name for the aggregation (will appear on the simulation aggregation layer and other downloadable aggregation files)
- `aggregation` - type of aggregation (from list below)
- `secondaryAttribute` - secondary attribute to use if applicable

Aggregations can be:
- `sum`
- `mean`
- `min`
- `max`
- `median`
- `deviation` - standard deviation 
- `weightedMean` - used the secondaryAttribute to identify a column to use for the weights

### GroupBySpec

Aggregations by default are performed only on the parent layer and shown when zoomed out on the Simulations layer.

They can also be computed for other "group by" values and will be available in the downloads section of the simulations detail page in the sidebar.

A GroupBySpec is a list of objects with the following attributes:
- `groupBy`: a list of attribute names (if all attributes are from the analysis layer) or a list of `{ attribute: [attribute], layer: [layer]}` objects to pull from other layers
- `outputName` - name of this "group by" which will be used to name the file for download

### Example

```json
{
  "aggregationSpec": [
    {
      "attribute": "HighestRLV",
      "aggregation": "mean",
      "outputName": "highestrlv-mean"
    },
    {
      "attribute": "HighRLVNoZone",
      "aggregation": "median",
      "outputName": "highrlvnozone-median"
    }
  ],
  "groupBySpec": [
    {
      "groupBy": [
        {
          "attribute": "ZONING",
          "layerName": "Parcels"
        }
      ],
      "outputName": "ZONING"
    }
  ]
}
```