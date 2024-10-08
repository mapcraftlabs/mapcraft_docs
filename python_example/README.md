# MapCraft Python API Examples

This directory contains example scripts to interact with MapCraft API. This is a public repo and we encourage user contributions. Pull Requests are welcomed!

## Minimal example script to demonstrate communication with MapCraft API

1. Install dependencies (use of isolated environment tools like `virtualenv` or `conda` are recommended)

```sh
pip install -r requirements.txt
```

2. Run the script

```sh
python quick_test.py YOUR_EMAIL YOUR_PASSWORD
```

## Functions in [utils.py](./utils.py)

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

```
