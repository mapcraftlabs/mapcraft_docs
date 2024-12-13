# MapCraft Project Configuration


## Endpoint

-	URL: `/layer/{{PROJECT_ID}}/{{LAYER_ID}}/schema`
-	Method: `POST`
-	Content-Type: `application/json`

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
