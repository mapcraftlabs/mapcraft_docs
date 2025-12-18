# MapCraft User Guide

## MapCraft App

The MapCraft app performs large-scale computation and urban visualization, enabling parcel-level analysis and flexible scenario creation for answering urban planning questions.

Spatial and lookup table layers are the building blocks of a MapCraft project. Layers are joined in the app to run analyses combining various data sources and producing outputs, including outputs by summary geography. Layer variables are interacted to produce any user-defined output, and global inputs are constructed to test modifying any variable across scenarios. Modifications to project layers are also uploaded to the app or created within the interface. Any combination of global inputs and layer alternatives can be run to study the outputs of simulations across alternatives.

The MapCraft app is commonly used to evaluate development feasibility across parcels in a jurisdiction and test the impact of various policy choices on development outcomes. After defining inputs and feasibility calculations, a global input could be defined to test changes to development feasibility under particular development cost changes, for example. Using a set of zoning regulation inputs, zoning alternatives could be constructed to observe development potential under various zoning modifications. Or, to instead test changes to a particular part of the study area, a transit station layer may be added to the project, with specific global input or zoning regulation changes applied in the areas around transit stations. Any of these scenarios, or combinations of scenarios, can be simulated in MapCraft to compare development potential under each development condition or policy alternative.

## MapCraft Users

There are three levels of MapCraft users, defined by their level of interaction with MapCraft projects. This User Guide is divided into three common methods of interacting with the app, which align with the MapCraft user levels:

- **Viewers** can explore MapCraft projects, their inputs and outputs, and use the app's interactive visualization features

- **Editors** can run simulations for a MapCraft project, design scenarios and explore outputs using app features

- **Admins** can create projects in MapCraft, configure settings and build inputs then used to design scenarios and explore outputs

A detailed description of the app functionality associated with each user level is shown in the chart below.

##### MapCraft Permissions by User Level

| Action                                                                                         | Public | Viewer | Editor | Admin |
|------------------------------------------------------------------------------------------------|--------|--------|--------|-------|
| Access to public projects                                                                      |   ✅   |   ✅   |   ✅   |   ✅   |
| View public scenarios                                                                          |   ✅   |   ✅   |   ✅   |   ✅   |
| Modify unlocked global inputs in unlocked <br> global scenarios **without** app storing values |   ✅   |   ❌   |   ❌   |   ❌   |
| Modify unlocked global inputs in unlocked <br> global scenarios storing values                 |   ❌   |   ✅   |   ✅   |   ✅   |
| About modal                                                                                    |   ❌   |   ✅   |   ✅   |   ✅   |
| Hide project elements for non-admins                                                           |   ❌   |   ❌   |   ❌   |   ✅   |
| Double-map toggle                                                                              |   ❌   |  🔑[^1]| 🔑[^1] |   ✅   |
| Simulations dropdown                                                                           |   ❌   |   ✅   |   ✅   |   ✅   |
| Download simulation results                                                                    |   ❌   |   ✅   |   ✅   |   ✅   |
| Run simulations                                                                                |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete own simulations (created by the user)                                                   |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete any simulation                                                                          |   ❌   |   ❌   |   ❌   |   ✅   |
| Show archived simulations                                                                      |   ❌   |   ❌   |   ❌   |   ✅   |
| Archive/unarchive simulations                                                                  |   ❌   |   ❌   |   ❌   |   ✅   |
| Scenarios dropdown                                                                             |   ❌   |   ✅   |   ✅   |   ✅   |
| Bookmarks panel                                                                                |   ❌   |   ❌   |   ✅   |   ✅   |
| Create scenarios                                                                               |   ❌   |   ❌   |   ✅   |   ✅   |
| Edit scenarios                                                                                 |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete own scenarios (created by the user)                                                     |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete any scenario                                                                            |   ❌   |   ❌   |   ❌   |   ✅   |
| Duplicate scenarios                                                                            |   ❌   |   ❌   |   ✅   |   ✅   |
| Edit themes                                                                                    |   ❌   |   ❌   |   ✅   |   ✅   |
| Copy/Delete Attributes                                                                         |   ❌   |   ❌   |   ✅   |   ✅   |
| Delete owned bookmarks                                                                         |   ❌   |   ❌   |   ✅   |   ✅   |
| Remove schema edits                                                                            |   ❌   |   ❌   |   ❌   |   ✅   |
| Emulate permissions                                                                            |   ❌   |   ❌   |   ❌   |   ✅   |
| Export non-Simulation layers                                                                   |   ❌   |   ❌   |   ❌   |   ✅   |
| Configurer modal                                                                               |   ❌   |   ❌   |   ❌   |   ✅   |
| Download all scenarios                                                                         |   ❌   |   ❌   |   ❌   |   ✅   |

[^1]: Only when enabled by admin users.