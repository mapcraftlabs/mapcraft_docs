# MapCraft API: Theming

The `themes` API endpoint is used to create, update and delete themes.
Layers should be configured one at a time, using separated requests.
This endpoint accepts a JSON payload with a well-defined structure, ensuring that only valid themes will be processed.


## Endpoint

-	URL: `/layer/{{PROJECT_ID}}/{{LAYER_ID}}/themes`
-	Method: `POST`
-	Content-Type: `application/json`

## Theme scale types

### Common attributes (all scale types)
  - **scaleType**: string (required)
    
    Determines how the data will be visualized on the map.
     
    #### Options
      
      -	`linear`: Linear scale (also known as equal-interval)
      - `quantile`: Quantile scale
      - `jenks`: Natural breakpoint scale (implementation [here](https://simple-statistics.github.io/docs/#ckmeans))
      - `manual`: User-defined breaks
      - `categorical`: Categories with defined color scheme
      - `boolean`: For boolean data
    
  - **highlightColor**: string (optional)
    
    Defines the color used to highlight selected regions or areas (i.e. when you click on a shape).
    
    *Example*: `"highlightColor": "#393B79"`
  
  - **opacity**: number (optional)

    Opacity level of filled-in shapes, ranging from 0.0 (fully transparent) to 1.0 (fully opaque).
    
    *Example*: `"opacity": 0.9`

  - **isFlipped**: boolean (optional)

    Indicates if the color scheme is inverted.
    
    *Example*: `"isFlipped": true`

### Manual Theme

  - **scaleType**: `"manual"` (required)
  
  - **colorScheme**: string (required)  ([Details](#color-scheme))

  - **breaks**: list[float] (required)
    
    Specifies break points for color bands.

### Boolean Theme
  
  - **scaleType**: `"boolean"` (required)
  
  - **colorScheme**: str (required) ([Details](#color-scheme))
  
### Graduated Themes
  
  - **scaleType**: `"linear"` or `"jenks"` or `"quantile"` (required)
  
  - **colorScheme**: str (required)  ([Details](#color-scheme))
  
  - **numBins**: int (required, an integer between 4 and 9)
    
    Number of bins to be used in the graduated scale.

    *Example: `"numBins": 6`*
  
### Categorical Theme
  - **scaleType**: `"categorical"` (required)

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

## Schema definition and example

Detailed schema definition and example from MapCraft API documentation [here](https://api.mapcraft.io/docs#/default/set_themes_endpoint_layer__project_id___layer_name__themes_post).

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
  --url https://api.mapcraft.io/layer/{{PROJECT_ID}}/{{LAYER_ID}}/themes \
  --header 'Content-Type: application/json' \
  --data '{
    "EffRent_Flex": {
      "colorScheme": "PuRd",
      "highlightColor": "#ffffcc",
      "opacity": 0.9,
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
      "highlightColor": "#ffffcc",
      "opacity": 0.9,
      "scaleType": "manual"
    },
    "Owner_Area": {
      "colorScheme": "Oranges",
      "highlightColor": "#ffffcc",
      "opacity": 0.9,
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
      "highlightColor": "#ffffcc",
      "opacity": 0.9,
      "scaleType": "categorical"
    },
    "zoned_capacity": {
      "colorScheme": "YlGnBu",
      "highlightColor": "#ffffcc",
      "opacity": 0.9,
      "scaleType": "linear"
    }
  }'
```

## Response

- 200 OK: Theme successfully configured.
- 400 Bad Request: Error processing schema definition. Invalid or misssing fields and values.
