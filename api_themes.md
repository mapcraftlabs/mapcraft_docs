# MapCraft API: Theming

The `set_theme` API endpoint is used to create, update and delete themes.
Layers should be configured one at a time, using separated requests.
This endpoint accepts a JSON payload with a well-defined structure, ensuring that only valid themes will be processed.


## Endpoint

-	URL: `/layer/{{PROJECT_ID}}/{{LAYER_ID}}/set_theme`
-	Method: `POST`
-	Content-Type: `application/json`

## Theme scale types

### Common attributes (all scale types)
  - **scaleType**: string (required)
    
    Determines how the data will be visualized on the map.
     
    #### Options
      
      -	`linear`: Linear scale
      - `manual`: User-defined breaks
      - `categorical`: Categories with defined color scheme
      - `autocategorical`: Auto-generates categories
      - `boolean`: For boolean data
    
    *Example: `"scaleType": "linear"`*

  - **highlightColor**: string (required)
    
    Defines the color used to highlight selected regions or areas (i.e. when you click on a shape).
    
    *Example: `"highlightColor": "#393B79"`*
  
  - **opacity**: number (required)

    Opacity level of filled-in shapes, ranging from 0.0 (fully transparent) to 1.0 (fully opaque).
    
    *Example: `"opacity": 0.5`*

  - **outlineColor**: string [Hex code] (required)
  
     Color used for outlining the visualized areas.
     
    *Example: `"outlineColor": "#393B79"`*

  - **isFlipped**: boolean

    Indicates if the color scheme is inverted.
    
    Default: `false`
    
    *Example: `"isFlipped": true`*

  - **forceNumeric**: boolean
      
    Forces the values to be treated as numeric for more consistent rendering,

    *Example: `"forceNumeric": true`*

### Manual Theme

  - **scaleType**: `"manual"` (required)
  
  - **colorScheme**: string (required)
  
    Specifies the color scheme for the layer. Follows common ColorBrewer color scales like RdYlBu, PuBuGn, etc.

    *Example**: `"colorScheme": "RdYlBu"`*
    
  - **breaks**: list[float] (required)
    
    Specifies break points for manual scaling.

### Boolean Theme
  
  - **scaleType**: `"boolean"` (required)
  
  - **colorScheme**: str (required) ([Details](#color-scheme))
  
### Continuous Theme
  
  - **scaleType**: `"continuous"` (required)
  
  - **colorScheme**: str (required)
  
  - **interpolate**:list[string] (required)
    
    Sets colors to be interpolated.
    
    Using two points color interpolation will be shown between those two colors. With three items color interpolation will go from color 1 to 3 but passing through the middle color.

    Min length: 2
    
    Max length: 3

    *Example: `"interpolate":["#FF0000","#FFFFFF","#215C0D"]`*

  - **middleValue**: float (required)
    
    Specifies middle value for continous scale.

    *Example: `"middleValue": 4.32`*
  

### Graduated Theme
  
  - **scaleType**: `"jenks"` or `"quantile"` (required)
  
  - **colorScheme**: str (required)
  
  - **numBins**: int (required)
    
    Number of bins to be used in the linear scale.

    *Example: `"numBins": 6`*
  
### Linear Theme

  - **scaleType**: `"linear"` (required)

  - **colorScheme**: str (required)
  
#### Attributes
  
  - **colorScheme**: string (required) ([Details](#color-scheme))

### Categorical Theme
  - **categories**: JSON (required)
    
    Defines categories and corresponding colors for categorical layers.

    *Example:*
    ```json
    {
      "categories": [
        {
          "category": "C1-40",
          "color": "#5254A3"
        },
        {
          "category": "C2-55 (M)",
          "color": "#637939"
        }
      ]
    }
    ```

  - **scaleType**: `"categorical"` (required)

### Autocategorical Theme
  - **scaleType**: `"autocategorical"` (required)

## Schema definition and example

Detailed schema definition and example from MapCraft API documentation [here](https://api.mapcraft.io/docs#/default/set_layer_theme_endpoint_layer__project_id___layer_name__set_theme_post).

## <a name="color-scheme"></a> Color scheme details
  
  ### Diverging

  - BrBG
  - PiYG
  - PRGn
  - PuOr
  - RdBu
  - RdGy
  - RdYlBu
  - RdYlGn
  - Spectral
  
  ### Qualitative

  - Accent
  - Dark2
  - Paired
  - Pastel1
  - Pastel2
  - Set1
  - Set2
  - Set3
  
  ### Sequential

  - Blues
  - Greens
  - Greys
  - Oranges
  - Purples
  - Reds
  - BuGn
  - BuPu
  - GnBu
  - OrRd
  - PuBu
  - PuBuGn
  - PuRd
  - RdPu
  - YlGn
  - YlGnBu
  - YlOrBr
  - YlOrRd
  
  Color Brewer playground [here](https://colorbrewer2.org/).
  
  Full colors details [here](https://github.com/axismaps/colorbrewer/blob/master/colorbrewer_schemes.js).
  

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
