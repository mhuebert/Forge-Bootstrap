Modified trigger.io sample project to use jade, stylus, coffeescript, and precompiled Handlebars templates.

To use, run npm install from within the /work directory, and compile assets by running "coffee compile.coffee".

The compile_and_run.sh script is a simple shortcut to compile, forge build, & forge run ios.

Inside the /work directory:

* /js - CoffeeScript files. Snockets is used to concatenate all of the javascript requirements specified in main.coffee.
* /views - Jade templates (compiled to HTML in /src/views)
* /templates - Jade + Handlebars templates (precompiled into templates.js and loaded into a global templates variable, accessible via templates.name_of_template_file. If a template name ends with "partial", it will be registered as a partial with Handlebars.)
* /css - Stylus files (compiled to /src/css). Not sure that @import commands would work.