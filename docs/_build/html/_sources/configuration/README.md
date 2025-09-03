# MapCraft Project Configuration

There is only one endpoint to edit the configuration for a project in the MapCraft
app (shown below).  If you make a GET request to the same endpoint, the api will
return the current configuration in the correct format, and a POST request to the
endpoint will update the configuration.  You may leave any piece of the update missing
in order to only update one part of the current configuration.

## Endpoint

-	URL: `/config/{{PROJECT_ID}}`
-	Method: `POST`
-	Content-Type: `application/json`

## cURL request example

Below is an example that updates a few themes in a single layer.  Note that the
overall format of the request does not change.

```sh
curl --request POST \
  --url https://api.mapcraft.io/config/{{PROJECT_ID}} \
  --header 'Content-Type: application/json' \
  --data '{
  "config": {
    "layerMap": {
      "Parcels": {
        "themes": {
          "hotel_occ": {
            "readOnly": true
          },
          "sf_sales_p": {
            "numberFormat": "0,0",
            "minimum": 380,
            "maximum": 460,
            "multipleOf": 20,
          },
          "a1_acqtyp": {
            "editable": true,
            "enum": ["Full", "Partial", "Easement", "None", "Unknown"],
            "showInTable": true,
          }
        }
      }
    }
  }'
```

## A full example

A full example json file can be found [here](example.json)

## Overall format

All requests take the general format below.  You may leave out any part of the
request you don't want to update.

- The ThemeMap object is documented [here](themes.md)
- The ShemaMap object is documented [here](schema.md)
- The LayerSettings object is documented [here](layer_settings.md)
- The ProjectSettings object is documented [here](project_settings.md)
- The AggregationSpec and GroupBySpec objects are documented [here](aggregation_spec.md)
- The FilterSpec object is documented [here](filter_spec.md)

```
{
  "config": {
    "layerMap": {
      "layerA": {
        "layerSettings": { /* LayerSettings object goes here */ },
        "themes": { /* ThemeMap object goes here */ },
        "schema": { /* SchemaMap object goes here */ }
      },
      "layerB": {
        "layerSettings": { /* LayerSettings object goes here */ },
        "themes": { /* ThemeMap object goes here */ },
        "schema": { /* SchemaMap object goes here */ }
      }
    },
    "projectSettings": { /* ProjectSettings object goes here */ },
    "aggregationSpec": { /* AggregationSpec object goes here */ },
    "groupBySpec": { /* GroupBySpec object goes here */ },
    "filterSpec": { /* FilterSpec object goes here */ }
  }
}
```

## Response

- 200: Theme successfully configured.
- 422: Error processing schema definition. Invalid or misssing fields and values.  Format of error message is determined by pydantic and fastapi.
