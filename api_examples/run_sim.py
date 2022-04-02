import click
from datetime import datetime
import utils


@click.command()
@click.argument("email")
@click.argument("password")
def run_simulation(email, password):
    token = utils.get_user_token(email, password)

    now = datetime.now()
    date_str = now.strftime("%m%d_%H%M")

    lab_id = "wsble2"

    response = utils.make_post_request(f"simulations/start/{lab_id}", token, dict(
        simulationName=f"API_SIM_{date_str}",
        simulationDescription="Test simulation using API",
        activeLayerScenarios={"Stations": "Baseline"},
    ))

    simulation_id = response["data"]["simulationId"]

    utils.poll_simulation_status_until_complete(lab_id, simulation_id, token)

    # fetch the aggregated data for the simulation
    response = utils.make_get_request(f"combined_data/{lab_id}/Simulations/{simulation_id}", token)

    # geojson with the shape data is returned from the endpoint - grab the columns we actually want
    columns = ["wsble_area", "STACKED FLAT 1", "STACKED FLAT 2", "STACKED FLAT 3", "TOWNHOME LR2"]
    data = [{col: feature["properties"].get(col) for col in columns} for feature in response["data"]["features"]]

    for row in data:
        print(row)


if __name__ == "__main__":
    run_simulation()
