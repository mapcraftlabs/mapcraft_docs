# Frozen Versions of Scenarios

## Overview

When a simulation is run, the data for each active scenario for each layer is frozen so that you can always return to the scenario’s state at the point in time when the simulation was run.

## How It Works

This is accomplished by storing a “last modified date” for each scenario which keeps track of the most recent edit made in each scenario. Note that only modifications to data are relevant - edits to metadata like name and description do not update the last modified date.

When a simulation is run, the data extraction step for each layer will check to see if there is already a frozen version with the current last modified date. If there is, the scenario will not be re-frozen. If there is not, a scenario will be “frozen” so that the name, description, active upload, and all edits will be kept and the user can return to this frozen state at any time.

## Efficiency

Note that this approach is optimally efficient. If numerous simulations are run over time and the scenario has no new edits, no new frozen versions will be created; instead, the appropriate scenario will be reused. Also note that no scenarios are frozen until a simulation is actually run. Numerous edits can be made over time and no scenarios will be frozen until a simulation is actually run.

## User Interface

See the screenshot below. Each layer in a simulation has:

* A button to download the data that was used in this simulation (combined base data and edits)
* A button to navigate to the frozen version of the scenario (which is not editable and which will not have new edits since this simulation was run)
* A button to navigate to the “active” scenario (the scenario that was used by the simulation, which might have new edits since this simulation was run)

The user can click on the frozen version of the scenario, duplicate that version, and continue working from a point in time in the past in this fashion. For instance, the user might prefer the policy assumptions used in a past version of the scenario, but want to make an additional edit. This is supported by returning to the frozen version of the scenario and duplicating it.  You can also use the frozen version of the scenario directly in new simulations if you have no need for additional changes.
