# MapCraft API: Set Theme

Set Theme API endpoint is used to create, update and delete layer themes.
Layers should be configured one at a time, on separated requests.
This endpoint accepts a JSON payload with a well-defined and strict structure, ensuring that only valid themes will be processed.


## Endpoint

•	URL: /layer/{{PROJECT_ID}}/{{LAYER_ID}}/set_theme
•	Method: POST
•	Content-Type: application/json


## Request body schema definition and example 

[Detailed schema definition and example from MapCraft API documentation.](https://api.mapcraft.io/docs#/default/set_layer_theme_endpoint_layer__project_id___layer_name__set_theme_post)

## cURL request example

```sh
curl --request POST \
  --url https://api.mapcraft.io/layer/{{PROJECT_ID}}/{{LAYER_ID}}/set_theme \
  --header 'Content-Type: application/json' \
  --data '{
  "EffRent_Flex": {
    "colorScheme": "PuRd",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  },
  "HighestRLV": {
    "breaks": [
      0,
      500,
      1000,
      1500,
      2000,
      25000,
      3000
    ],
    "colorScheme": "PRGn",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "isFlipped": false,
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "manual"
  },
  "Owner_Area": {
    "colorScheme": "Oranges",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  },
  "ZONING": {
    "categories": [
      {
        "category": "C1-40",
        "color": "#5254A3"
      },
      {
        "category": "C1-65",
        "color": "#6B6ECF"
      },
      {
        "category": "C1-30",
        "color": "#393B79"
      },
      {
        "category": "C2-40",
        "color": "#9C9EDE"
      },
      {
        "category": "SM-D 40-85",
        "color": "#9F0CB0"
      }
    ],
    "hide": false,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "categorical"
  },
  "a1_aq_1": {
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "autocategorical"
  },
  "disp_risk": {
    "colorScheme": "YlGn",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  },
  "etod_category_auto": {
    "categories": [
      {
        "category": "AGENCY TOD: CONSOLIDATION REQ",
        "color": "#4EBFDD"
      },
      {
        "category": "AGENCY TOD: HIGH PRIORITY",
        "color": "#2C2A7B"
      },
      {
        "category": "AVOID IF POSSIBLE",
        "color": "#F8EE4D"
      },
      {
        "category": "COMMUNITY TOD: JOBS FOCUS",
        "color": "#CE592E"
      },
      {
        "category": "COMMUNITY TOD: MIXED-USE FOCUS",
        "color": "#A13895"
      },
      {
        "category": "NO CATEGORY",
        "color": "#CCCCCC"
      },
      {
        "category": "NONE",
        "color": "#FFFFFF"
      },
      {
        "category": "POTENTIAL PRESERVATION TARGET",
        "color": "#9FC13B"
      }
    ],
    "colorScheme": "YlOrBr",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "autocategorical"
  },
  "etod_category_final": {
    "categories": [
      {
        "category": "AGENCY TOD: CONSOLIDATION REQ",
        "color": "#4EBFDD"
      },
      {
        "category": "AGENCY TOD: HIGH PRIORITY",
        "color": "#2C2A7B"
      },
      {
        "category": "AVOID IF POSSIBLE",
        "color": "#F8EE4D"
      },
      {
        "category": "COMMUNITY TOD: JOBS FOCUS",
        "color": "#CE592E"
      },
      {
        "category": "COMMUNITY TOD: MIXED-USE FOCUS",
        "color": "#A13895"
      },
      {
        "category": "NO CATEGORY",
        "color": "#CCCCCC"
      },
      {
        "category": "NONE",
        "color": "#FFFFFF"
      },
      {
        "category": "POTENTIAL PRESERVATION TARGET",
        "color": "#9FC13B"
      }
    ],
    "colorScheme": "Reds",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "categorical"
  },
  "etod_category_paint": {
    "categories": [
      {
        "category": "AGENCY TOD: CONSOLIDATION REQ",
        "color": "#4EBFDD"
      },
      {
        "category": "AGENCY TOD: HIGH PRIORITY",
        "color": "#2C2A7B"
      },
      {
        "category": "AVOID IF POSSIBLE",
        "color": "#F8EE4D"
      },
      {
        "category": "COMMUNITY TOD: JOBS FOCUS",
        "color": "#CE592E"
      },
      {
        "category": "COMMUNITY TOD: MIXED-USE FOCUS",
        "color": "#A13895"
      },
      {
        "category": "NO CATEGORY",
        "color": "#CCCCCC"
      },
      {
        "category": "NONE",
        "color": "#FFFFFF"
      },
      {
        "category": "POTENTIAL PRESERVATION TARGET",
        "color": "#9FC13B"
      }
    ],
    "colorScheme": "Greens",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "categorical"
  },
  "etod_paint": {
    "highlightColor": "#4d4d4d",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "autocategorical"
  },
  "existing_community_amenity": {
    "colorScheme": "RdGy",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  },
  "existing_etod": {
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "autocategorical"
  },
  "existing_transitsupportive": {
    "colorScheme": "Purples",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  },
  "is_undvpbl": {
    "colorScheme": "RdYlBu",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  },
  "pin": {
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "autocategorical"
  },
  "pres_use_d": {
    "categories": [
      {
        "category": "4-Plex",
        "color": "#393B79"
      },
      {
        "category": "Apartment",
        "color": "#5254A3"
      },
      {
        "category": "Apartment(Mixed Use)",
        "color": "#6B6ECF"
      },
      {
        "category": "Apartment(Subsidized)",
        "color": "#9C9EDE"
      },
    ],
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "categorical"
  },
  "yr_built": {
    "breaks": [
      1900,
      1920,
      1940,
      1960,
      1980,
      2000,
      2020
    ],
    "colorScheme": "PuBu",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "isFlipped": false,
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "manual"
  },
  "zoned_capacity": {
    "colorScheme": "YlGnBu",
    "forceNumeric": true,
    "highlightColor": "#ffffcc",
    "opacity": 0.9,
    "outlineColor": "#000000",
    "scaleType": "linear"
  }
}'
```

## Response

- 200 OK: Theme successfully configured.
- 400 Bad Request: Error processing schema definition. Invalid or misssing fields and values.