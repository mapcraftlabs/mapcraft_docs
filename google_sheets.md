# MapCraft Web API with Google Sheets and Apps Script

MapCraft web API provides a way to interact with the app programmatically, including easily launching several simulations at a time.

Google Sheets, combined with Google Apps Script, is a useful tool to automate calling the api.  This repository contains a Google Sheets + Apps Script template to launch several simulations at a time, iterating over all rows and sending an API request for each one.

Script code and sheets columns should be customized to fit specific user needs e.g. setting active scenarios, global inputs, and parcel filters.

## How it works

Google Sheets Script for MapCraft API iterates over every row of `Simulations to run` sheet sending a request to MapCraft API to enqueue a new simulation.

Authorization credentials are obtained from the `Authorization` sheet.

## Steps

1.	Open Google Sheets: Start by opening your Google Sheets document.
2.	Open Apps Script:
	Go to `Extensions > Apps Script` to open the Apps Script editor.
3.	Edit the Script:
	In the Apps Script editor, create or edit a new script file and write the provided code.
4. 	Run the Script:
    Click the Run button in the Apps Script editor to execute the script.


## Simulations To Run' Schema

| Column name | Description |
| -- | -- |
| skip | Skip rows from being triggered by the script. Mostly useful when adding new sets of simulations on the same spreadsheet were other sims were already triggered |
| simulation_name | Required by API, although AppScript launcher has a small function to add a placeholder name if the cell is empty with a name `SIM_{YYMMDD}_{ITERATION_CHAR}` |
| simulation_description | Not required. Default: empty. Helpful to find specific simulations on batches where all simulation settings are similar |
| {layer_name}_scenario [^1]	| Required. `{layer_name}` scenario name to be used in the simulation. Case sensitive. [^2] [^3] |
| parcel_filter | Not required. Default: empty, no filter. This columns can take a filter name as it is specified in Lab. If the filter name is not found the syntax will be executed over parcel dataset. If it's not a name and there's an error in the syntax, simulation will fail
| {global_name} [^4] | Not required. Default: global value from MapCraft. One-time substitution value for `{global_name}` global defined in MapCraft.

[^1]: Lists are not supported in layer names, every cell should contain only one layer name.
[^2]: `Baseline` is the default base scenario name
[^3]: Every layer defined in MapCraft must be specified on a Sheets column.  i.e: for a Lab with `Parcels` and `Block Groups` layers `parcels_scenario` and `block_groups_scenario` columns should be present and not empty.
[^4]: Lists are not supported in globals names, each global to be substituted should be on its own column.


## MapCraft Sheets Library

We provide a set of Google Apps Script functions to hide communication details between Google Sheets and MapCraft Web API. Also removing the need of writing it by yourself and having to mantain that code afterwards.
There are two ways to use AppScript versioning system, both with its pros and cons:
- **Setting a specific version number** will keep the same exact code unless you set a different library version on your Google Sheet. Important: Library version is not modified on other Sheets from which it could have been copied. A negative aspect of this could be MapCraft adding features or fixes to the library and the Sheet will not be using it unless you manually set the new version number.
- **`HEAD (development mode)`** will always use the latest version of the library, with the positive aspect that all fixes and updates will be applied instantly on all Sheets using this mode. A downside of this could be AppScript code using a specific function name or parameters that, if library footprint (function names and/or parameters) change, all Sheets will stop working instantly as well.

The user can pin to a specific version of the MapCraft AppScript library, or always use the latest.  If you're using the latest, MapCraft does not guarantee reverse compatibility in all cases, so your Sheet may break when the library is updated.

## Changelog

- v3
  - `MapCraft.makeAPIRequest()` renamed to MapCraft.makeAPIRequest()
  - `getSimName()` moved from user code to MapCraft.getSimulationName()
  - Base URL changed from `https://api.mapcraft.io/` to `https://api.mapcraft.io/`


### MapCraft Library

- `getSimulationName(int iteration)`
  Return unique simulation name based on date/time and iteration number.
  
- `getUserToken(Object email, Object password, Object API_KEY)`
  This is used to authenticate API requests using your app email/password - the token returned from this function must be passed in the header of follow-up requests.

- `makeAPIRequest(Object url, Object payload, Object token)`
  Sends request to MapCraft API.

- `sheetAsObjectArray(Object sheetName)`
  Takes Sheet data and returns it as an array.


### Apps Script code

```js
/**
 * Before running this script:
 * 
 * - Check user and password on Authorization tab of the spreadsheet.
 * - Check projectId constant, projectId should be exactly the same as the dashboard name.
 *      Dashboard URL: https://app.mapcraft.io/Terner_Dashboard_Arcata
 *      projectId: "Terner_Dashboard_Arcata"
 * - All layers in instance should be added to activeLayerScenarios section of the payload
 *      Note that quotation marks must be used when spaces are included in layer name
 * - All columns with global values to be overwritten should be added to globalOverrides section of the payload
 * 
 * To run this script:
 *  - Confirm all desired simulation runs are properly noted in the spreadsheet
 *  - Check any boxes in simulation rows that you do NOT want to run
 *  - Hit 'Run' button in menu bar above
 * 
 * Notes:
 * - Empty value in 'workspace' column will only work on single-workspace projects.
 */

function main() {
  const auth = MapCraft.sheetAsObjectArray("Authorization")[0]
  const token = MapCraft.getUserToken(auth["email"], auth["password"])
  const projectId = "Terner_Dashboard_Arcata"
  const url = "https://api.mapcraft.io/simulations/start/" + projectId

  let iteration = 0;

  MapCraft.sheetAsObjectArray("Simulations to Run").forEach(row => {
    if (row["skip"] !== true) {
      if (row["simulation_name"].length === 0) {  
        simulationName = MapCraft.getSimulationName(iteration)
        iteration++
      } else {
        simulationName = row["simulation_name"]
      }

      const payload = {
        simulationName: simulationName,
        simulationDescription: row["simulation_description"],
        activeLayerScenarios: {
          Globals: row["globals_scenario"],
          "Block Groups": row["block_groups_scenario"],
          Parcels: row["parcels_scenario"]
        },
        globalOverrides: {
          RentApprToggle: row["rent_appr_toggle"],
          AbsorbRateToggle: row["absorb_rate_toggle"]
        },
        parcelFilter: row["parcel_filter"]
      }

      if (row["workspace"].length > 0) {
        payload.workspace = row["workspace"]
      }

      const response = MapCraft.makeAPIRequest(url, payload, token)
      Logger.log(response)
    }
  })
}
```
