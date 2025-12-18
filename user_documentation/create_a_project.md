## Create a Project

**[Admin]**

### Project Requirements

A Mapcraft project contains a set of files that will be used to configure the project in the app. The foundation of a project is the **analysis file** (or file package) that specifies the project's input layers and variables, global inputs, output variables, and calculations defining the analysis.

The project layers defined in the analysis file make up the input data to feed the analysis. Each layer type serves a purpose in project setup. The three layer types of a MapCraft project are:

- An **Analysis Layer** corresponding to the project's unit of analysis, or the child layer to which additional project layers will join. Often the analysis layer for a MapCraft project is parcels, containing the parcel shapes and parcel attributes for the project.

- A **Parent Layer** to join to the child layer and summarize analysis results. Most often parent layers are Census Tracts or Block Groups, containing the project's summary shapes and any input information from the data, such as Census price and rent information. The parent layer is a spatial file, visualizing summary geographies.

- **Additional Layers** contain additional spatial or lookup table information for the analysis but are most commonly used for scenario creation. For example, a parcel variable for a project may represent a transit layer and whether a parcel is located within an existing transit area. That variable can easily be used in analysis calculations or even to set up global inputs that test changes within transit areas. However if the project is intended to test alternative station areas themselves, a layer can be set up to run analysis calculations using different transit area boundaries. Similarly, to test different inclusionary zoning policies, a lookup table of inclusionary zoning rates that join to a parcel jurisdiction attribute, for example, could be added. The layer can then be used to test different scenarios of inclusionary zoning rates in the analysis.

#### Analysis File

##### Requirements

Each MapCraft project requires an analysis file defining all input layers in the analysis (analysis, parent, and additional layers) and their variables. It also defines the project's global inputs, output variables, and the calculations linking these components together.

###### Inputs

The inputs in an analysis file define each input variable with a set of required fields. The fields are required for all input, global, and output variables, with the exception of the Layer field.

**Inputs, Globals, & Outputs Requirements**

| Field | Description | Example |
|-------|-------------|---------|
| **Title** | The input/global/variable variable name to display in the app | Parcel Sqft |
| **InternalName** | A computer-friendly version of the input/global/output variable name that doesn't contain spaces | parcel_sqft |
| **Layer** | The layer the input variable comes from (Inputs requirement only) | Parcels |
| **Group** | A category to organize the variable in the app display | Parcel Attributes |
| **Value** | A representative value for the variable used for debugging calculations and verifying the app produces intended results | 5000.0 |
| **Type** | The datatype of the variable, used to verify uploaded data has the expected datatype that will be used in the app [string, float, categorical, boolean, percent] | Float |
| **Description** | A description of the input to display in the app | Square feet of parcel area |

###### Globals

The Global Inputs, or Globals, in an analysis file are variables that modify analysis calculations and can be adjusted as scenario-based inputs in the app.

Globals can be set up as calculations that modify input variables, such as a percentage change to a parcel's setback requirements, or as inputs that modify analysis calculations themselves, such as specifying a construction cost to be used in development feasibility calculations. Globals can take many forms to modify calculations, including binary levers used to toggle variables on or off for an analysis.

###### Outputs

Outputs in an analysis file define the variables that result from the calculations. Outputs can be derived in different ways from the analysis file information and can include:

- Input variable values after the application of global inputs, for example reporting Max DUA as an output for all parcels after the global input "Max Allowed DUA Multiplier" is applied

- Interim calculation values that inform primary outputs, such as the building envelope for parcels after applying setbacks and global setback multipliers

- Primary calculation outputs, for example total residential unit capacity for a housing capacity analysis, along with secondary outputs of interest like number of inclusionary units required as part of this capacity.

##### Calculations

Calculations are defined as part of the analysis file for two main purposes: applying the global inputs and generating project outputs.

Calculations can range from simple logic, like multiplying an input variable by a value to apply a global input, to detailed calculations like running real estate pro formas across numerous building prototypes for each parcel. The way the calculations are specified in the analysis file to be used in the app is determined by which main analysis file format is used.

##### File Formats

The MapCraft app supports two analysis file types: Excel workbooks and Python file packages. The primary difference between these two formats is how analysis calculations are constructed, either using Excel formulas or with Python code. Python packages also contain JSON files to define the Inputs, Globals, and Outputs specifications.

###### Excel Workbook

Click [here](https://docs.google.com/spreadsheets/d/1AdNSsPDORI0YxhIL_HwFsbUJzxOJX1b4/edit?gid=494493136#gid=494493136) to view or download an Excel workbook analysis file template.

In an Excel workbook, each section described in the Analysis Files Requirements is specified in a spreadsheet.

The Calculations section of the spreadsheet contains the Excel formulas that help derive the outputs listed in the Outputs section. Outputs themselves can also reference other cells and use formulas to generate the output.

Globals are also listed in the workbook. Globals that use calculations, such as a Max DUA multiplier, reference the Calculations section containing the Excel formula being applied to the input of interest.

Best Practices

For each input and global input, a "Value" field is used to provide a representative value. The Calculations and Outputs sections also use the "Value" field, but to specify the Excel formulas used. With the formulas in these cells, the "Value" field can be used to check and debug analysis calculations in the workbook. Large calculations or lookups used in the analysis are often performed on a new spreadsheet tab.

MapCraft interprets Excel formulas used in the workbook to use in the app analysis. Most formulas commonly used in Excel are supported in the app, but you can see a detailed list of all MapCraft-supported formulas [here](https://formulajs.info/functions/).

###### Python Package

Click [here](https://github.com/mapcraftlabs/res_capacity_demo/tree/main) to view or download a Python package analysis file template.

In a Python package, each section described in the Analysis File Requirements is specified in a JSON file, while the calculations used in the app are written in Python. The Python script or set of scripts contain functions for applying the globals and functions for performing the analysis calculations. These functions use two parameters: the parcels DataFrame is the parcels table after all input layers are joined in the app, and the globals dictionary is the dictionary of Globals names and values as defined in the JSON specification (for application to the parcel data).

A yaml file is also included to point the app to the three key components of the Python package: the analysis module name, the function name to call for analysis, and the JSON spec file.

The Python package is uploaded to the app as a zipped file package. The package itself is an installable set of files, with pyproject.toml strongly recommended for configuration to ensure long-term support (pyproject.toml documentation can be found [here](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)).

Best Practices

Project specifications and calculations defined in an analysis file are read into MapCraft and run for each project. Therefore following standard code practices for Analysis File inputs and calculations will help ensure they will be able to run.

Local testing of Analysis File packages may be done to test package installation and usage. For testing purposes, the JSON spec file can be used to pull Globals dictionaries from or compare intended output variables against.

Most dependencies used in a package will already be supported in MapCraft. If you find a dependency in your package to not be supported, reach out to a MapCraft team member.

#### Analysis Layer

##### Requirements

The Analysis Layer corresponds to the unit of analysis defined in the Analysis File, which is often parcels.

- The input file requires a unique identifier for the analysis unit and all other attributes associated with the Analysis Layer.

- Since the Parent Layer will be joined to the Analysis Layer for summarization, the Analysis Layer must contain a join column for the Parent Layer

- Additional Layers defined as part of the project must also have a join key for additional layers available as an Analysis Layer column, unless the Additional Layer will use a spatial join.

##### Best Practices

As parcels are a common analysis unit for projects, standard parcel cleaning procedures are performed prior to using the analysis input in the app. MapCraft runs the calculations defined by the user over the Analysis Layer uploaded, whether it contains polygons and/or multipolygons, so parcel files with standard cleaning, such as removing stacked parcels and right-of-ways as appropriate for project goals, will lead to accurate project outputs.

#### Parent Layer

##### Requirements

As discussed, the parent layer joins to a column defined in the Child Layer (or Analysis Layer). The unique identifier of the Parent Layer should be the table's index and correspond to the join key used to perform the join to the Child Layer. Note: the join key names of the Child Layer and Parent Layer do not need to match, as the join key for each table can be specified during project layer configuration.

##### Best Practices

Since the Parent Layer is intended to summarize Child Layer geographies in an analysis, the Parent Layer should be clipped to the Analysis Layer prior to being used as an input. The Parent Layer can also contain polygons and/or multipolygons.

#### Additional Layers

##### Requirements

Additional Layers can be either lookup tables or spatial data. For a lookup table layer, like Parent Layers the input should contain a unique identifier as the index, corresponding to a join key on the analysis layer.

For a spatial layer, the layer is also joined using a join key index or, less commonly, using a spatial join. In the case of a spatial join, any Parent Layer geometries containing the representative point of the Child Layer (a center point within the geometry) will be joined, followed by an intersection join for any parcels that fail.

##### Best Practices

Like Parent Layers, Additional Layers are clipped to the study area and can contain multipolygons.

When designing a project's set of layers, the most useful layer setup will generally contain the simplest layer relationships. In MapCraft, all layers join to the Analysis Layer. If multiple Additional Layers are required for a parcel-level project, for example, each layer should join back to a parcel key. However, if a new lookup table uses a parcel variable join key that could be more directly spatially associated with the Parent Layer, for example, that data could instead be included on the Parent Layer or by defining a Parent Layer variable with a lookup. Conversely, a lookup can easily be set up as part of an analysis file to categorize a variable, but if the variable is parcel-based and used in the core analysis, it may be clearer to add it directly as a layer in the project.

### App Configuration

#### Configuration Page

Projects are built in the MapCraft app using the Configuration Setup Page. After uploading an analysis file, the app will prompt users to upload the layers and variables for a project as defined in the analysis file. You can then configure other layer settings and set up output summary calculations for simulations.

To access the Configuration Page, click the slider icon on the main project page.

![Config Button](config_button.jpg)

##### Project Tab

On the Configuration Page, use the *Project Tab* first to define project details and select key settings for a project.

##### Analysis Tab

###### Uploads

Use the *Analysis Tab - Uploads* subtab to upload an analysis file. The "Status" column on the upload page will indicate any issues to remedy before being able to use the file to run successful simulations. For example, clicking on a failed "Status Upload" icon may report that a file requirement is missing or the Analysis File could be structured more efficiently.

Once an Analysis File is uploaded, all of the project's layers will be shown under the *Layers Tab*. If the first Analysis File for a project is being uploaded, or a version containing a new layer is uploaded, those layers will be added to the *Layers Tab* with an icon indicating that the layer's data has not yet been uploaded.

Globals Updates

New Analysis File uploads may also contain new Globals variables or values. When a new Analysis File is selected as the active upload, selecting "Upload and Fill" in the pop-up window will populate the project with the latest Globals values. This setting ensures that Globals values for a project will not update silently.

##### Layers Tab

###### Settings

Rows per Tile

MapCraft simulations perform analysis for large datasets by parallel processing computation. Processing occurs by sectioning data into tiles. The "Rows per Tile" setting adjusts the number of rows for each tile to process. Smaller datasets require fewer tiles. However, if a tile has too many rows a simulation will fail. In this case, the "Rows per Tile" setting should be adjusted to set a lower number of rows per tile. Note that if the number of rows per tile is set too low, there won't be enough rows to load at the maximum zoom level.

###### Base Data

Use the *Base Data* tab of each layer to upload the spatial file or lookup table associated with the layer. This is where you'll upload the layer, as well as any layer alternatives that will be used for the layer's scenarios (see Run Simulations - Scenario Building - Layers Scenarios for more on using layer uploads for scenarios).

Spatial File Formats

For small spatial files, up to 300MB, GeoJSON and zipped GeoJSON files can be uploaded to a project. For larger spatial files, up to 1GB, Parquet files should be uploaded. For file uploads larger than 1GB, contact a MapCraft team member.

GeoJSON and Parquet files are used to encode types natively, allowing consistent encoding of strings where appropriate. The biggest problem this solves is that FIPS codes are read as strings with leading zero characters (e.g., California as '06'), which Python/Pandas does not support unless the "dtype" parameter is used each time a file is read. With Parquet instead of CSV, this process is less error prone.

Support for [Parquet](https://www.linkedin.com/pulse/perfect-file-format-unveiled-parquet-vs-csv-shailendra-prajapati/) is now ubiquitous and it's clear it will take over in use cases where csv used to be popular. In short, it's a tabular format that encodes data types in the file (mainly numeric vs. string, but other types as well). When using Python/Pandas you can also encode columns as categorical and set the index appropriately, and the app will use this information to configure the project. Parquet is smaller (and includes compression in the file format, which is supported), and parses faster than CSV and zipped CSV.

Geoparquet is a flavor of parquet which we support, but is not required. In short, we require parquet files to have a column named "geometry" which is either in WKT or WKB format (either is fine, we will autodetect).

R also supports Parquet, but the indication of categorical column and index values is specific to the language. It's not something we've tested much, but we encourage someone to try it and fill out this section of the documentation. We're happy to increase our support for R Parquet files where appropriate.

Lookup Table File Formats

Small non-spatial lookup tables are still supported for CSV upload. These files do not need to contain a "geometry" column and will not be rendered on the map.

###### Inputs

After uploading a layer through its *Base Data* subtab, the *Inputs* subtab will report the status of the layer's input variables in relation to the inputs defined in the Analysis File. Most often, an input variable defined in the Analysis File isn't found in the data itself, or the data type of the variable doesn't match the type defined in the Analysis File. In this case, either the data or the Analysis File will need to be updated to ensure simulations can run as defined in the analysis setup.

##### Simulations Tab

While a project's output variables are defined in the Analysis File, the *Aggregations* subtab is used to automatically generate summary statistics for simulation variables. Aggregations enable the interpretation of simulation results by reporting outcomes across the less aggregate Analysis Layer. When a simulation is run, Aggregations are reported for the full Analysis Layer as well as for the Parent Layer summary geographies.

*Groupby* groups project variables by the categories of a given attribute.

*Filters* subset the project area for a simulation. Filters can be used to debug an analysis by focusing on a narrower part of the project area. They have also been used to apply policies to a specific area by filtering to the policy area and applying the policy. The filtered area can be combined with the remaining project area Baseline results for comparison to the full Baseline.

##### Workspaces

Workspaces allow new environments for a project to be created to tailor the project environment. Workspaces use a project's Active Upload layers and use Partitions to filter layer attributes for a given workspace. A common use case for workspaces is to filter parcels in a project for a given set of users. Simulations run in the workspace will only show up in that workspace.

#### Project Display Settings

Configured projects are rendered with all layers defined in the Analysis File and uploaded using the Configuration Page. Use the dropdown menu to visualize spatial layers and view lookup tables in the app. Click the "Open Table" button at the bottom of a spatial layer to view its data in table form.

![layer dropdown](layer_dropdown.jpg)

##### Maps Display

For each spatial layer, display settings can be configured for layer variables by clicking the "Show Edit Mode" button on that layer's *Maps Panel*.

![maps edit](maps_edit.jpg)

For each layer variable, you can use the "Edit Attribute" pencil icon next to the variable name to control several aspects of the variable's display:

- Set the "Number Format" (General Settings) to choose the appropriate format for numerical attributes displayed on maps and in legends

- Use "Form Settings" to control how a variable can be edited on the *Inputs Panel* (see the Run Simulations- Scenario Building section for more on variable editing)

- Use "Theme Settings" to set the visual display of the values of an attribute, including the color scheme, method of scaling, and number of bins used in the display and legend

To apply the theme settings you've selected for a variable to any other applicable variable, click the "Copy Theme" button next to the variable to be copied.

Any layer variable can be hidden from the *Maps Panel*, *Table Display*, or *Forms* (used to edit the variables on the *Inputs Panel*) using the appropriate buttons next to the variable name.

Once edits have been made, use the "Only Edits" button to toggle the edits on and off and view changes to the maps display.

![view edits](view_edits.jpg)

##### Inputs Display

Click on the *Inputs Panel* by selecting the *Inputs* tab next to the *Maps* tab. If no map feature is selected, the "Global Inputs" for the project will appear in the *Inputs Panel.* As with the *Map Panel*, click the "Show Edit Mode" button to enable the "Edit Attribute" pencil next to each global variable and modify their display settings. Both "Number Format" and "Form Settings" can be chosen for each global variable.

Selecting a map feature on the map of a spatial layer will display "Place Inputs" for that feature on the *Inputs Panel*. The "Place Inputs" format for each attribute will be displayed according to the settings chosen for the variable in the *Maps Panel* - "Form Settings"*.* You can also edit these settings in "Place Inputs" by clicking the "Show Edit Mode" button to enable the "Edit Attribute" pencil next to each layer attribute.

##### Outputs Display

Once a simulation has been completed, navigate to a simulation and use the *Maps Panel* to edit the display settings for the project outputs. Use the same settings features as with Globals and Inputs to tailor display settings to the output data.
