### Quicksims

Quicksims are used to run a minimal simulation that takes an input parcel file, an input analysis zip file, and generates an output parquet file.

You can call the api using any mechanism that can make a POST request, with the endpoint documented [here](https://api.mapcraft.io/docs#/quicksim/quicksim_endpoint_quicksim_post).

The script `run_quicksim.py` gives a short python example for authenticating to the api using an email and password and passing a JSON file to the quicksim endpoint.

The python script requires `click` and `requests` which you can install with `pip install -r requirements.txt`

`quicksim.json` is an example of the parameters necessary to run a quicksim:

* `input_storage_url` - a signed url to the input parquet file
* `script_url` - a signed url to the analysis zip file
* `module_name` and `function_name` - identify the function to call in the analysis file
* `globals_data` - a dictionary of global inputs
* `description` - an optional description to use as metadata

You can then go to your "My Projects" page and click the hurricane on the navbar to see status of running simulations and, when complete, download the output parquet file.