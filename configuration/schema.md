# MapCraft Configuration: Schema object 

The `schema` object is used to configure how the MapCraft app edits and displays a data attribute. 

## How to edit the schema of global inputs

To edit globals, use a LAYER_ID of `Globals`.  Also note, `showInTable` does not apply to globals.

### Schema attributes

  - **editable**: boolean (optional, default true)
    
    Whether to include this attribute in the form

    *Example*: `"editable": False`

  - **readOnly**: boolean (optional, default false)

    Similar to editable, but includes the value in the form but disables the input

    *Example*: `"readOnly": True`

  - **showInTable**: boolean (optional, default true)

    Whether to show in the edit table at the bottom of the app

    *Example*: `"showInTable": True`

  - **enum**: list of strings (optional)
    
    Available values for a categorical input (overrides what's found in the data)

    *Example*: `"enum": ["a", "b", "c"]`

  - **numberFormat**: string (optional, default `0,0[.]0[0]a`)
    
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

### Full example of a schema map

A schema map is used to map attribute names to schema objects

```json
{
  "hotel_occ": {"readOnly": true},
  "sf_sales_p": {
    "numberFormat": "0,0",
    "minimum": 380,
    "maximum": 460,
    "multipleOf": 20
  },
  "a1_acqtyp": {
    "editable": true,
    "enum": ["Full", "Partial", "Easement", "None", "Unknown"],
    "showInTable": true
  }
}
```