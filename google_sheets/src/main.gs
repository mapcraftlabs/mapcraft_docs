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