# MapCraft Labs

This repo is used to collaboratively build user documentation.  Pull Requests welcome!  View specific topics below.

### [Uploading shape data](uploads.md)

## Permissions

### Labs

| Action                                                                                      | Public | Viewer | Editor | Admin |
|---------------------------------------------------------------------------------------------|--------|--------|--------|-------|
| Access to public labs                                                                       |   ✅   |   ✅   |   ✅   |   ✅   |
| View public scenarios                                                                       |   ✅   |   ✅   |   ✅   |   ✅   |
| Modify unlocked global inputs in unlocked <br> global scenarios without app storing values  |   ✅   |   ✅   |   ✅   |   ✅   |
| About modal                                                                                 |   ❌   |   ✅   |   ✅   |   ✅   |
| Simulations dropdown                                                                        |   ❌   |   ✅   |   ✅   |   ✅   |
| Download sims                                                                               |   ❌   |   ✅   |   ✅   |   ✅   |
| Scenarios dropdown                                                                          |   ❌   |   ✅   |   ✅   |   ✅   |
| Bookmarks panel                                                                             |   ❌   |   ❌   |   ✅   |   ✅   |
| Create scenarios                                                                            |   ❌   |   ❌   |   ✅   |   ✅   |
| Edit scenarios                                                                              |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete scenarios                                                                            |   ❌   |   ❌   |   ✅   |   ✅   |
| Duplicate scenarios                                                                         |   ❌   |   ❌   |   ✅   |   ✅   |
| Run sims                                                                                    |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete sims                                                                                 |   ❌   |   ❌   |   ✅   |   ✅   |
| Edit themes                                                                                 |   ❌   |   ❌   |   ✅   |   ✅   |
| Copy/Delete Attributes                                                                      |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete owned bookmarks                                                                      |   ❌   |   ❌   |   ✅   |   ✅   |
| Remove schema edits                                                                         |   ❌   |   ❌   |   ❌   |   ✅   |
| Emulate permissions                                                                         |   ❌   |   ❌   |   ❌   |   ✅   |
| Export non-Simulation layers                                                                |   ❌   |   ❌   |   ❌   |   ✅   |
| Configurer modal                                                                            |   ❌   |   ❌   |   ❌   |   ✅   |
| Download all scenarios                                                                      |   ❌   |   ❌   |   ❌   |   ✅   |
| Show archived filters                                                                       |   ❌   |   ❌   |   ❌   |   ✅   |
| Archive/unarchive filters                                                                   |   ❌   |   ❌   |   ❌   |   ✅   |


### API

| API Endpoint                                                                                | Public | Viewer | Editor | Admin |
|---------------------------------------------------------------------------------------------|--------|--------|--------|-------|
| `GET /base_data/{lab_root}/{layer_name}`                                                    |   ❌   |   ✅   |   ✅   |  ✅   |
| `GET /base_data_tiles/{lab_root}/{layer_name}/{upload_id}/{z}/{x}/{y}.pbf`                  |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /base_data/{lab_root}/{layer_name}`                                                   |   ❌   |   ❌   |   ❌   |  ✅   |
| `GET /combined_data/{lab_root}/{layer_name}/{scenario_id}`                                  |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /fill_in_excel_file/{lab_root}`                                                       |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /ingest_python_module/{lab_root}/{analysis_id}`                                       |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /join_csv/{lab_root}/{layer_name}/{scenario_id}`                                      |   ❌   |   ❌   |   ❌   |  ✅   |
| `POST /join_shapes/{lab_root}`                                                              |   ❌   |   ✅   |   ✅   |  ✅   |
| `DELETE /layer/{lab_root}/{layer_name}`                                                     |   ❌   |   ❌   |   ❌   |  ✅   |
| `POST /live_analytics/{lab_root}`                                                           |   ❌   |   ❌   |   ✅   |  ✅   |
| `GET /microsimulation_data/{lab_root}/{simulation_id}`                                      |   ❌   |   ❌   |   ❌   |  ✅   |
| `GET /scenario/{lab_root}/{layer_name}/{scenario_id}`                                       |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /scenario/create/{lab_root}/{layer_name}`                                             |   ❌   |   ❌   |   ✅   |  ✅   |
| `DELETE /scenario/{lab_root}/{layer_name}/{scenario_id}`                                    |   ❌   |   ❌   |   ✅   |  ✅   |
| `GET /simulations/aggregations/{lab_root}/{simulation_id}`                                  |   ❌   |   ❌   |   ❌   |  ✅   |
| `GET /simulations/status/{lab_root}/{simulation_id}`                                        |   ❌   |   ❌   |   ❌   |  ✅   |
| `POST /simulations/aggregations/{lab_root}/download`                                        |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /simulations/start/{lab_root}`                                                        |   ❌   |   ❌   |   ✅   |  ✅   |
| `GET /simulation_v2/vector_tiles/{lab_root}/{simulation_id}/{z}/{x}/{y}.pbf`                |   ❌   |   ✅   |   ✅   |  ✅   |
| `POST /workflows/ingest_layer_data/{lab_root}/{layer_name}`                                 |   ❌   |   ❌   |   ❌   |  ✅   |
