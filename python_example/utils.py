import json
import time

import requests

BASE_URL = "https://api.mapcraft.io"
# this API_KEY is not private - it's used to identify MapCraft accounts
API_KEY = "AIzaSyAkHpE1XXujzAQyqAGbI3P6jl31nnT3adA"


def get_user_token(email: str, password: str) -> str:
    """
    This is used to authenticate API requests using your app email/password - the token returned
    from this function must be passed in the header of follow-up requests.
    """
    data = requests.post(
        f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}",
        json=dict(email=email, password=password, returnSecureToken=True),
    ).json()
    return data["idToken"]


def make_post_request(endpoint: str, token: str, body: dict) -> dict:
    response = requests.post(
        f"{BASE_URL}/{endpoint}",
        json=body,
        headers=dict(Authorization=f"Bearer {token}"),
    )
    assert response.status_code == 200
    return response.json()


def make_get_request(endpoint: str, token: str) -> dict:
    response = requests.get(
        f"{BASE_URL}/{endpoint}", headers=dict(Authorization=f"Bearer {token}")
    )
    assert response.status_code == 200
    return response.json()


def poll_simulation_status_until_complete(
    project_id: str, simulation_id: str, token: str
):
    while 1:
        data = make_get_request(
            f"simulations/status/{project_id}/{simulation_id}", token
        )

        if data["error"]:
            raise Exception("Simulation failed:", data["error"])

        print("Simulation status:", data["currentStep"])

        if data["currentStep"] == "Simulation Complete":
            elapsed_time = (
                data["simulationCompleteTime"] - data["simulationStartTime"]
            ) / 1000
            print(f"Simulation complete in {round(elapsed_time, 1)}s")
            return

        time.sleep(5)


def get_layer_data_url(project_id: str, token: str) -> str:
    """
    Get URL where layer data file is stored.
    """
    response = requests.get(
        f"{BASE_URL}/base_data/{project_id}/Accessibility",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    return json.loads(response.text)["url"]


def download_layer_data_to_file(project_id: str, file_name: str, token: str):
    """
    Download layer data to file.

    file_name: full file path where will be downloaded.
    """
    url = get_layer_data_url(project_id, token)
    open(file_name, "wb").write(url)


def upload_base_data_from_file(
    project_id: str, layer_id: str, file_name: str, token: str
):
    """
    Upload base data file to API.

    file_name: full file path to be uploaded.
    """
    file = open(file_name, "rb")

    response = requests.post(
        f"{BASE_URL}/base_data/{project_id}/{layer_id}",
        headers={"Authorization": f"Bearer {token}"},
        files={"file": file},
    )
    assert response.status_code == 200
    print(response.text)
    return


def upload_join_csv_data_from_file(
    project_id: str, layer_id: str, scenario_id: str, file_name: str, token: str
):
    """
    Upload join_csv data file to API.

    file_name: full file path to be uploaded.
    """
    file = open(file_name, "rb")

    response = requests.post(
        f"{BASE_URL}/join_csv/{project_id}/{layer_id}/{scenario_id}",
        headers={"Authorization": f"Bearer {token}"},
        files={"file": file},
    )

    assert response.status_code == 200
    print(response.text)
