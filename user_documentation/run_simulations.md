## Run Simulations

**[Admin] [Editor]**

### Scenario Building

MapCraft projects contain a set of input layers, including spatial layers and lookup tables, used to build analysis calculations. Calculations are specified with a set of global variables that allow the user to design flexible levers using the analysis inputs and calculations. Each of these components is used to build global or layer-based scenarios and run simulations in the Mapcraft App.

#### Globals Scenarios

##### Globals Panel

Globals scenarios are constructed using the *Globals Panel* of a project. The "Baseline" scenario for each project populates with the Globals variables and values defined in the project's analysis file (see Create a Project - Configuration Page - Analysis Tab for information on how to update the Baseline scenario as an Admin User). To create an initial new Globals scenario, click the "Duplicate" button to copy the Baseline globals, then update the values. Once additional Globals scenarios have been created, new scenarios can be established by duplicating any existing scenario, allowing series of Globals scenarios to be easily constructed.

![copy globals](copy_globals.jpg)

To modify Globals variables for a given Globals scenario, update the variables of interest in the panel. To track changes made to Globals variables for the scenario, use the "Changelog" button near the top of the panel to see a table of all the edits that constitute the Globals scenario.

##### Globals Table

Another way to interact with Globals scenarios is through the *Layers Dropdown Menu*. In the Globals Table view, all Globals variables are shown by scenario. To select which scenarios show in the table, click the "Scenarios Filter" button to select scenarios, or the "Reset Scenarios" button to see all scenarios if the scenarios are already filtered.

The Globals table allows organizing scenarios to quickly view simulation inputs. Right-clicking a column and selecting "Freeze Column" will move a scenario to the front of the table. In addition, scenario columns can be re-ordered by dragging and dropping them.

To edit a project's Globals scenarios, click in table cells to update Globals values, or copy-and-paste cells (including copying by dragging cells) to quickly modify scenarios across the table.

![globals table](globals_table.jpg)

#### Layers Scenarios

##### File changes

Any project layer, including the Analysis Layer, can be supplemented with layer alternatives in order to create scenarios. To create a layer scenario, select the layer in the *Layers Dropdown Menu*, then make sure you've selected "Scenarios" next to the *Layers Dropdown Menu*. As with Globals scenarios, the "Duplicate" scenario button is used to quickly create a new scenario.

![scenario copy](scenario_copy.jpg)

To use an alternative layer file for the scenario, click the dropdown in the "Active Upload" field for the scenario and select the file containing the scenario changes.

For a spatial file, an alternative scenario layer could include changes to the attributes of that layer. However, MapCraft has built-in features for easily modifying layer attributes for new scenarios. Therefore, new file uploads are generally selected when the spatial layer alternative contains geometry changes. For example, a project may want to test the impact of an entirely different zoning map, and compare outcomes to those under the Baseline zoning districts.

For lookup tables, alternative versions of the lookup are often specified in a CSV, and the "Active Upload" dropdown can be used to create a lookup table scenario with an alternative CSV input. For example, the Baseline inclusionary rates lookup table can be swapped for an alternative set of inclusionary rates specified in a new CSV used for that scenario.

##### Place-based Inputs

Spatial layer attributes can be edited using the *Place Inputs Panel* for a given layer. "Place Inputs" can be used to make changes to the file, for example a Baseline zoning file could contain an attribute that doesn't reflect the zone's current use. Clicking on the zone with the error and updating the attribute value in the *Place Inputs Panel* updates the layer to include the new value.

Clicking the "Changelog" button in the panel opens a pop-up window with the changes made to that geography. To see a changelog for the entire layer, return to the *Maps Panel* for the layer and click the "Changelog" button there.

The same process is used to create scenarios for a spatial layer. After creating a new scenario in the *Scenarios Menu*, clicking the "eye" icon next to the scenario or selecting it from the *Layers Dropdown Menu* opens that scenario. For a zoning layer scenario, a scenario alternative could be relaxing the height restrictions in a particular zone.

![place inputs](place_inputs.jpg)

After updating the "Max Height (ft)" attribute for the zone of interest, view the changes to the zone for the scenario in the *Changelog*.

![changelog](changelog.jpg)

View changes to the zone across all layer scenarios by clicking the "Edit Inputs" button near the top of the *Place Inputs Panel*. As with the Globals, the table view allows editing values across scenarios. Click in table cells to update their values, or copy-and-paste cells (including copying by dragging cells) to quickly modify scenarios across the table.

![features table](features_table.jpg)

#### Frozen Scenarios

When a simulation is run, the data for each active scenario for each layer is frozen so that you can always return to the scenario's state at the point in time when the simulation was run.

This is accomplished by storing a "last modified date" for each scenario which keeps track of the most recent edit made in each scenario. Note that only modifications to data are relevant - edits to metadata like name and description do not update the last modified date.

When a simulation is run, the data extraction step for each layer will check to see if there is already a frozen version with the current last modified date. If there is, the scenario will not be re-frozen. If there is not, a scenario will be "frozen" so that the name, description, active upload, and all edits will be kept and the user can return to this frozen state at any time.

Note that this approach is optimally efficient. If numerous simulations are run over time and the scenario has no new edits, no new frozen versions will be created; instead, the appropriate scenario will be reused. Also note that no scenarios are frozen until a simulation is actually run. Numerous edits can be made over time and no scenarios will be frozen until a simulation is actually run.

Frozen scenarios freeze edits at the time of a simulation using the simulation's layers. Each layer in a simulation has:

- A button to download the data that was used in this simulation (combined base data and edits)

- A button to navigate to the frozen version of the scenario (which is not editable and which will not have new edits since this simulation was run)

- A button to navigate to the "active" scenario (the scenario that was used by the simulation, which might have new edits since this simulation was run)

To utilize frozen scenarios, click on the frozen version of the scenario, duplicate that version, and continue working from a point in time in the past in this fashion. For example, to use a policy assumption used in a past version of the scenario, but with an additional edit, return to the frozen version of the scenario and duplicate it. Otherwise, use the frozen version of the scenario directly in new simulations if no additional changes are needed.

### Simulation Running

To run a simulation using a configured project and project scenarios, select the calculator icon on the main project page.

![run simulation](run_simulation.jpg)

The "Run Simulation" pop-up window is used to set a simulation name and description and select the global scenario and layer scenarios for each project layer to be used in the simulation. Once the "Run Simulation" button is clicked, the "View Progress button" will display the simulation progress until the analysis is complete and outputs are generated. Errors occurring during simulation will generate an error message, for example a join issue occurring during the "Extract" step will indicate the join issue to fix before retrying the simulation.

In the app's main dropdown menu, the "All Simulations" selection displays every simulation run for a project. The "Scenarios" column for a simulation entry displays the global scenario and layer scenarios used to generate the simulation, while the "Uploads" column points to the input file used for each of those scenarios. Any parcel filters applied to the simulation (see App Configuration - Simulations Tab for simulation filtering information) will appear under the "Parcel Filters" column.

![view simulations](view_simulations.jpg)

#### Localized Simulations

Alternatively, a simulation can be run for a particular part of the project area using the "Select" and "Run" buttons on the main project panel. After selecting the scenarios for the simulation, the simulation will run for the project area in view. This can be a useful way to generate quick simulations, debug analysis calculations, and inspect data issues.

![localized runs](localized_runs.jpg)

#### Simulation Throttling and Limits

To ensure fair usage and system stability, simulation requests are throttled based on both the number of simulations and the number of tiles processed. The following limits are used for individual users running MapCraft simulations.

##### Hourly Simulation Limits

Per-user Limits:

- simulation per hour = 30
- geoprocessings per hour = 10
- quicksims per hour = 30

Per-User Customization:

- Per-user customization can be done by MapCraft using simulationsHourlyLimit, geoprocessingHourlyLimit, and quicksimHourlyLimit.

Enforcement:

- The sum of simulations run in the past hour and the number of simulations in the current batch must not exceed the user's simulationsHourlyLimit.

##### Tile-Based Throttling

Tile Counting:

- Each simulation counts the number of tiles in its input data.
- For throttling, a single simulation cannot count for more than 100 tiles, even if it processes more.

Concurrent Tile Limits:

- App-initiated simulations: Up to 300 tiles can be processed concurrently.
- API-initiated simulations: Up to 600 tiles can be processed concurrently.
- Per-user limit: Each user can run up to 300 tiles concurrently.

##### Examples of Tile-Based Throttling

- If a project requires 150 tiles, a user can run 3 simulations concurrently (since each simulation is capped at 100 tiles for throttling).
- If a project requires 50 tiles, a user can run 6 simulations concurrently (6 × 50 = 300 tiles).

These rules ensure that no single user or project can monopolize system resources, maintaining performance and availability for all users.