# MapCraft Configuration: ProjectSettings object

General project settings - do not set any values you don't want to update

- `labName` - name the project
- `description` - visible description for the project
- `aboutUrl` - link to Google Doc to use in the about page
- `zoom` - default zoom level
- `center` - default center position in the format `{ lat: 35, lng: -120 }`
- `showAboutModalEveryTime` - open the about modal when a user opens a project
- `enableSimulations` - (bool, default False) -  enable simulations
- `defaultBordersVisible` - (bool, default True) - show borders by default
- `defaultTransitVisible` - (bool, default False) - show the transit layer by default
- `defaultMapLabelsVisible` - (bool, default True) - show the map labels by default
- `hideDoubleMapToggle` - (bool, default True) - allow user to do scenario comparison using the double map 
- `baseMap` - default base map, values are `grey`, `dark`, `aerial`, `streets`, and `outdoors` (default `grey`)
- `onFailedJoinDefault` - default behavior for failed joins, values are `raise`, `drop`, `continue`, `continue_<_50_percent_failure` (default `continue_<_50_percent_failure`)