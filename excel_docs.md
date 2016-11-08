# Using the Excel converter and Labs

The excel converter is a project called multiformajs and has its own documentation (generally you have to run a python script and then drag the output onto a website with downloads a .js file).  Multiformajs takes an Excel file of the proper format and converts it into a Javascript method with an object input and object output so that it can be run in the context of the website.

**Note that there is a version 1 and version 2 of multiformajs.  These docs describe how to use version 2.  If the Javascript doesn't look like it follows this documentation that's likely because it was created using version 1.**

### The format of the output of multiformajs

The multiformajs output looks a lot like [this](https://github.com/mapcraftlabs/labs_examples/blob/gh-pages/sea_proforma.js).  Note that there is a PROFORMA_INPUTS, PROFORMA_GLOBALS, and PROFORMA_OUTPUTS list defined, and a method called proforma which takes an input object and returns an output object.  For historical reasons there are separate inputs and globals object and these get merged together by the app to pass as the single input object and the outputs list defines what to expect from the output object.  The inputs and outputs include numerous attributes which define how they should be used inside the Labs app.  Here is a list of the current attributes that are defined.

* Variable - the display name of the variable, which can include funny characters - e.g. "Depth of Affordability (% Median Family Income"
* InternalName - the internal name of the attribute, which should not include funny characters - e.g. "Depth of Affordability"
* Group - the name of the group for this attribute - the attributes get placed into an "accordion" with this header in the form that edits the attributes - e.g. "Affordable Housing"
* Type - the type of attribute - e.g. string, float, percent
* "Theme?" - whether or not to theme this attribute in the app - e.g. Yes or No
* Layer - the name of the layer which will edit this attribute - in other words, some attributes are edited on the primary layer and some get edited on secondary layers and joined to the primary layer.


