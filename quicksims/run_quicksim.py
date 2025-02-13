import json

import click
import requests

BASE_URL = "https://api.mapcraft.io"
# this API_KEY is not private - it's used to identify MapCraft accounts
API_KEY = "AIzaSyAkHpE1XXujzAQyqAGbI3P6jl31nnT3adA"  # prod


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
    print(response)
    assert response.status_code == 200
    return response.json()


@click.command()
@click.argument("email")
@click.argument("password")
@click.argument("json_file")
def quicksim(email, password, json_file):
    token = get_user_token(email, password)
    with open(json_file) as f:
        body = json.load(f)
    data = make_post_request(endpoint="quicksim", token=token, body=body)
    print(data)


if __name__ == "__main__":
    quicksim()
