# MapCraft Configuration: Filters

Filters are used to filter the analysis layer when running simulations and are available in a dropdown in the "run simulation" dialog.

They are a list of objects with attributes:
- `name` - the name of the filter to show in the dropdown
- `query` - a [pd.query](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.query.html) query to run against the parcel DataFrame

Example:

```json
{
  "filterSpec": [
    {
      "name": "Old buildings",
      "query": "yr_built < 1950"
    },
    {
      "name": "Test filter",
      "query": "(station == 'Ballard') and (yr_built > 1940)"
    }
  ]
}
```
