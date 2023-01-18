/**
 * Add this script id to your project to get the MapCraft lib
 * 1fXX4Ww_onXV6oGgAO7kTR8LlFKWkaYPyHtj4_uCchGDOYGr1J8cu1vSZ
 */

function main() {
  const authentication = MapCraft.sheetAsObjectArray("Authorization")[0]
  const token = MapCraft.getUserToken(authentication["email"], authentication["password"])
  Logger.log(token)

  MapCraft.sheetAsObjectArray("Simulations to Run").forEach(row => {
    const labId = "wsble2"
    const url = "https://api.mapcraftlabs.com/simulations/start/" + labId

    const payload = {
      simulationName: row["simulation_name"],
      simulationDescription: row["simulation_description"],
      activeLayerScenarios: {
          Parcels: row["parcels_scenario"],
          "Station Areas": row["station_areas_scenarios"],
          Globals: row["globals_scenario"]
      },
      globalOverrrides: {
        ConstMultiple: row["ConstMultiple"]
      }
    }
    Logger.log(payload)

    const response = MapCraft.makeLabsAPIRequest(url, payload, token)
    Logger.log(response)
  })
}