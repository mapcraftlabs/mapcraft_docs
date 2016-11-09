# Using the Excel converter and Labs

The excel converter is a project called multiformajs and has its own documentation (generally you have to run a python script and then drag the output onto a website which downloads a .js file).  Multiformajs takes an Excel file of the proper format and converts it into a Javascript method with an object input and object output so that it can be run in the context of the website.

**Note that there is a version 1 and version 2 of multiformajs.  These docs describe how to use version 2.  If the Javascript doesn't look like it follows this documentation that's likely because it was created using version 1.**

### The format of the output of multiformajs

The multiformajs output looks like [this](https://github.com/mapcraftlabs/labs_examples/blob/gh-pages/sea_proforma.js).  Note that there is a PROFORMA_INPUTS, PROFORMA_GLOBALS, and PROFORMA_OUTPUTS list defined, and a method called proforma which takes an input object and returns an output object.  For historical reasons there are separate inputs and globals objects but these get merged together by the app to pass as the single input object and the outputs list defines what to expect from the output object.  The inputs and outputs lists are made up of objects which include several attributes which define how they should be used inside the Labs app.  Here is a list of the current attributes that may be defined.

* Variable - the display name of the variable, which can include funny characters - e.g. "Depth of Affordability (% Median Family Income"
* InternalName - the internal name of the attribute, which should not include funny characters - e.g. "Depth of Affordability"
* Group - the name of the group for this attribute - the attributes get placed into an "accordion" in the form with this header to edit attributes - e.g. "Affordable Housing"
* Type - the type of attribute - e.g. string, float, percent
* "Theme?" - whether or not to theme this attribute in the app - e.g. Yes or No
* Layer - the name of the layer which will edit this attribute - in other words, some attributes are edited on the primary layer and some get edited on secondary layers and joined to the primary layer.  If not present, it's assumed that the attribute will be part of the primary layer.  Only the inputs list should have this attribute, not globals or outputs.

### Configuring the App using Excel

The general idea of this functionality is 1) to be able to write analysis in Excel rather than Javascript and 2) to allow the Excel user to configure the app in many ways by editing the Excel file directly.  The first is taken care of by multiformajs and the second is described in this document.  Basically the output from multiformajs is used to inform certain funcionality in the app - e.g. the Theme? column on the inputs and outputs is used to add different themes to the app.  This is a fluid and flexible process and completely controlled by the configurer.  **The configuration format described elsewhere in this document still holds, and it's up to the configurer to convert the inputs and outputs into data which matches the expected configuration.**

An example of how to do this is shown [here](https://github.com/mapcraftlabs/labs_examples/blob/b8a71be723503be630c84f066b0033e6ba5e2ad7/sea_config.js#L6) in the `helpers` object.  This is the current version and is likely to change.  In fact, this is code actually copied from configuration file to configuration file and is not (yet) considered to be a user tested and robust library.  Use it as you see fit, as a quick way to get started, etc.  Add new elements to the list and modify existing elements (e.g. all themes will have the same color scheme if using the current helpers - perhaps that's not ideal).  **In other words, the configuration of the app is encouraged to go beyond the scope of what is returned from helpers.**

For now, the way helpers works is just too fluid to document exhaustively.  View the sample code and expand or throw it away as you see fit.  At least one example should suffice - the example on theming.

In the config file, by default, the themes function can rely entirely on the themes helper.  In this case, the returned value from getRows is passed in.  getRows is also included as context (it is used in several functions in the config file).  In this case this is a configuration for the Neighborhood layer so it filters to inputs where the Layer attribute is set to 'Neighborhood'.  In other words, we pass the appropriate input objects to the helpers method.

```javascript
themes: function () {
    return helpers.getThemes(this.getRows()); 
},
getRows: function () {
    return _.where(PROFORMA_INPUTS, {'Layer': 'Neighborhood'});
},
```

The configuration for themes is described [here](https://github.com/mapcraftlabs/labs_examples#themes).  That is the documentation for how themes work, and so we need to make the result of this function look like that.  In this case we take each object that was passed in and turn them info theme configuration obecjts using internal and external names and quite a few hard-coded attributes.  This is why the color scheme will be the same for every input.  If you don't like that, feel free to change the config after it gets returned (above) or just change the code in the helper.

```javascript
getThemes: function (obj) {

    themes = {};

    obj.forEach(function (l) {
        themes[l.InternalName] = {
            attr: l.InternalName,
            legendName: l.Variable,
            opacity: .9,
            forceNumeric: true,
            outlineColor: '#000000',
            highlightColor: '#ffffcc',
            scaleType: 'linear',
            interpolate: ['#fff5eb', '#7f2704']
        };
    });

    return themes;

},
```

That's pretty much it.  There are also helpers to configure attribute editing forms, the table view, the hover feature template and the helpers are free to be expanded for other configuration as required too, or configuration can always occur in a hard-coded fashion - whatever is appropriate for the job.

To expand on the current set of functionality, we have for instance discussed allowing slider bars to be configured in the Excel files.  To do that we might add "Min" and "Max" columns for all the inputs in the Excel file, these would then become attributes on the inputs objects in the js (that comes out of multiformajs).  We would then implement a helper for the `editableAttributesFormat` method and create objects which follow the configuration described [here](https://github.com/mapcraftlabs/labs_examples/#editableattributesformat).  I don't know off the top of my head what that configuration would look like, but it's described in gory detail on the open source project [here](https://github.com/mozilla-services/react-jsonschema-form).  Thus it does require a few layers in order to add this feature, but this allows for, we hope, an *extremely* flexible app configuration process and keeps as much power in the configurer's hands as possible.
