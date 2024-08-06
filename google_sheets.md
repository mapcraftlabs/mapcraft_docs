# MapCraft Web API with Google Sheets and Apps Script

MapCraft web API provides a way to interact with the app programmatically, including easily launching several simulations at a time.

Google Sheets, combined with Google Apps Script, is a useful tool to automate calling the api.  This repository contains a Google Sheets + Apps Script template to launch several simulations at a time, iterating over all rows and sending an API request for each one.

Script code and sheets columns should be customized to fit specific user needs e.g. setting active scenarios, global inputs, and parcel filters.

## Steps

1.	Open Google Sheets: Start by opening your Google Sheets document.
2.	Open Apps Script:
	Go to `Extensions > Apps Script` to open the Apps Script editor.
3.	Edit the Script:
	In the Apps Script editor, create or edit a new script file and write the provided code.
4. 	Run the Script:
    Click the Run button in the Apps Script editor to execute the script.

## MapCraft Sheets Library versioning

The user can pin to a specific version of the MapCraft AppScript library, or always use the latest.  If you're using the latest, MapCraft does not guarantee reverse compatibility in all cases, so your Sheet may break when the library is updated.

## Changelog

- v3
  - `MapCraft.makeLabsAPIRequest()` renamed to MapCraft.makeAPIRequest()
  - `getSimName()` moved from user code to MapCraft.getSimulationName()
  - Base URL changed from `https://api.mapcraftlabs.com/` to `https://api.mapcraft.io/`


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
  const url = "https://api.mapcraftlabs.com/simulations/start/" + projectId

  let iteration = 0;

  MapCraft.sheetAsObjectArray("Simulations to Run").forEach(row => {
    if (row["skip"] !== true) {
      if (row["simulation_name"].length === 0) {  
        simulationName = getSimName(iteration)
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
```
