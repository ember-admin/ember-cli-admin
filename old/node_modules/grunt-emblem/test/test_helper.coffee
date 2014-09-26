########################################
# Test Config
#######################################

global.should = require("should")
global.grunt = require("grunt")
global.jsdom = require("jsdom")

########################################
# Helpers
#######################################

global.jQueryJs = -> vendorScript "/jquery-1.9.1.js"
global.handlebarsJs = -> vendorScript "/handlebars-1.0.0-rc.3.js"
global.emberJs = -> vendorScript "/ember-1.0.0-rc.1.js"

global.vendorScript = (path) ->
  vendorDir = __dirname + "/vendor"
  grunt.file.read(vendorDir + path, "utf8")
