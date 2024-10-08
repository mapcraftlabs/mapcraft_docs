import click
from datetime import datetime
import json
import utils


@click.command()
@click.argument("email")
@click.argument("password")
def run_simulation(email, password):
    token = utils.get_user_token(email, password)

    now = datetime.now()
    date_str = now.strftime("%m%d_%H%M")

    lab_id = "wsble2"

    response = utils.make_post_request(
        f"simulations/start/{lab_id}",
        token,
        dict(
            simulationName=f"API_SIM_{date_str}",
            simulationDescription="Test simulation using API",
            activeLayerScenarios={"Stations": "Baseline"},
        ),
    )

    simulation_id = response["simulationId"]
    print(f"Simulation started with id: {simulation_id}")

    utils.poll_simulation_status_until_complete(lab_id, simulation_id, token)

    # fetch the aggregated data for the simulation
    response = utils.make_get_request(
        f"combined_data/{lab_id}/Simulations/{simulation_id}", token
    )

    with open(f"simulation_{simulation_id}_results.geojson", "w") as fp:
        json.dump(response["data"], fp)


if __name__ == "__main__":
    run_simulation()
