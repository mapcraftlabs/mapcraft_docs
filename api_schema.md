# MapCraft API: Schema 

The `schema` API endpoint is used to create, update and delete attribute schemas.
Layers should be configured one at a time, using separate requests.
This endpoint accepts a JSON payload with a well-defined structure, ensuring that only valid schemas will be processed.


## Endpoint

-	URL: `/layer/{{PROJECT_ID}}/{{LAYER_ID}}/schema`
-	Method: `POST`
-	Content-Type: `application/json`

### Schema attributes

  - **editable**: boolean (optional)
    
    Whether to include this attribute in the form

    *Example*: `"editable": False`

  - **readOnly**: boolean (optional)

    Similar to editable, but includes the value in the form but disables the input

    *Example*: `"readOnly": True`

  - **showInTable**: boolean (optional)

    Whether to show in the edit table at the bottom of the app

    *Example*: `"showInTable": True`

  - **enum**: list of strings (optional)
    
    Available values for a categorical input (overrides what's found in the data)

    *Example*: `"enum": ["a", "b", "c"]`

  - **numberFormat**: string (optional)
    
    A format string used by [numeralJS](http://numeraljs.com/).

    *Example*: `"numberFormat": "0,0.0"`

    Current allowed values are (new values can be added by request):
    - "0"
    - "0,0"
    - "0,0.0"
    - "0,0.00"
    - "0.0a"
    - "$0,0"
    - "$0,0.00"
    - "0%"
    - "0.00%"

  - **minimum, maximum, multipleOf** - float or int (optional)

    Slider configuration parameters.  Must include all 3 parameters if one is included.  Sets the min, max and step of a slider.

    *Example*: `"minimum": 10, "maximum": 20, "multipleOf": 2`

## cURL request example

```sh
curl --request POST \
  --url https://api.mapcraft.io/layer/{{PROJECT_ID}}/{{LAYER_ID}}/schema \
  --header 'Content-Type: application/json' \
  --data '{
    "hotel_occ": {"readOnly": True},
    "sf_sales_p": {
      "numberFormat": "0,0",
      "minimum": 380,
      "maximum": 460,
      "multipleOf": 20,
    },
    "a1_acqtyp": {
      "editable": True,
      "enum": ["Full", "Partial", "Easement", "None", "Unknown"],
      "showInTable": True,
    },
  }'
```

## Response

- 200: Theme successfully configured.
- 422: Error processing schema definition. Invalid or misssing fields and values.  Format of error message is determined by pydantic and fastapi.
