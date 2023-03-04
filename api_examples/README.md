# MapCraft API Examples

This directory contains example scripts to interact with MapCraft API. This is a public repo and we encourage user contributions. Pull Requests are welcomed!

## Minimal test script to test communication with MapCraft API

1. Install dependencies (use of isolated environment tools like `virtualenv` or `conda` are recommended)

```sh
pip install -r requirements.txt
```

2. Run the script

```sh
python quick_test.py YOUR_EMAIL YOUR_PASSWORD
```

## Functions on [utils.py](./utils.py)

- Authentication

  - `get_user_token(email: str, password: str) -> str:`

- Basic communication

  - `make_post_request(endpoint: str, token: str, body: dict) -> dict:`
  - `make_get_request(endpoint: str, token: str) -> dict:`

- Data I/O

  - `get_layer_data_url(lab_id: str, token: str) -> str:`
  - `download_layer_data_to_file(lab_id: str, file_name: str, token: str):`
  - `upload_base_data_from_file(lab_id: str, layer_id: str, file_name: str, token: str):`
  - `upload_join_csv_data_from_file(lab_id: str, layer_id: str, scenario_id: str, file_name: str, token: str):`

- Monitor Simulations Status

  - `poll_simulation_status_until_complete(lab_id: str, simulation_id: str, token: str):`

## FAQ / Notes

- `INVALID_PASSWORD` error when trying to obtain a token can be due to two reasons:

  - **An invalid password**

    Note that the password isn't the one from your Google Account, and different environments (like dev and prod) could have different passwords as well.

  - **A Firebase user not associated to an email account provider**
    MapcraftLabs has two different options for logins. One, using email and password; the other one using Google Authentication. Using the latter doesn't mean you can use your Google Account password to login using the API. For this kind of usage you need to set email as the default login provider and associate a password to that. Going to [this section of the Firebase Console](https://console.firebase.google.com/u/1/project/mapcraftlabs-dev/authentication/users) you can ask for a password reset on the desired user. This could be misleading. If the icon on the `Providers` column for that user is a Google "G" that means that your user doesn't have _email_ as the default login provider. Asking for a password reset (and actually resetting password) will set email as the default provider. That doesn't mean that your other logins on Google sites will change. It will just affect this specific application on this specific environment. In case you have an email-like envelope icon then you already have email as the default provider. Asking for a password reset will just do that.

- Layer name to be used on the API could not be the same as `Layer Display Name` on the application. Layer name as seen on the API is the name of when layer was created. Modifying Layer display name on the application will not affect Layer name from the API.
