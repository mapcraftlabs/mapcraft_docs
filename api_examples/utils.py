import requests
import time


BASE_URL = "https://api.mapcraftlabs.com"
# this API_KEY is not private - it's used to identiy MapCraft accounts
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
    response = requests.post(f"{BASE_URL}/{endpoint}", json=body, headers=dict(Authorization=f"Bearer {token}"))
    assert response.status_code == 200
    return response.json()


def make_get_request(endpoint: str, token: str) -> dict:
    response = requests.get(f"{BASE_URL}/{endpoint}", headers=dict(Authorization=f"Bearer {token}"))
    assert response.status_code == 200
    return response.json()


def poll_simulation_status_until_complete(lab_id: str, simulation_id: str, token: str):
    while 1:
        resp = make_get_request(f"simulations/status/{lab_id}/{simulation_id}", token)
        data = resp["data"]

        complete_study_areas = data["completeStudyAreaCount"]
        total_study_areas = data["totalStudyAreaCount"]
        errors = data["errors"]

        if errors:
            raise Exception("Simulation failed:", errors)

        print(f"{complete_study_areas} of {total_study_areas} study areas complete")

        # we could also wait for simulationConcatenationCompleteTime if we wanted the concatenated results
        if data["simulationStudyAreasCompleteTime"]:
            elapsed_time = (data["simulationStudyAreasCompleteTime"] - data["simulationStartTime"]) / 1000
            print(f"Simulation complete in {round(elapsed_time, 1)}s")
            return

        time.sleep(5)


