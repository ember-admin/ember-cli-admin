/*
 * grunt-emblem
 * https://github.com/wordofchristian/grunt-emblem
 *
 * Copyright (c) 2013 Christian Schlensker
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var jsdom = require('jsdom');

  var EmberBuilder, TemplateBuilder, VanillaBuilder, description, fileExists, writeOutput, _;

  _ = grunt.util._;

  description = 'Compile emblem templates into Handlebars.';

  grunt.registerMultiTask('emblem', description, function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed + grunt.util.linefeed
    });

    // Make window for compilation
    var window = jsdom.jsdom().createWindow();

    // load each dependency into the window
    var dependencies = options.dependencies;

    if (dependencies.jquery) {
      window.run(grunt.file.read(dependencies.jquery, 'utf8'));
    }

    window.run(grunt.file.read(dependencies.handlebars, 'utf8'));

    window.run(grunt.file.read(dependencies.emblem, 'utf8'));

    var templateBuilder;

    if (dependencies.ember) {
      window.run(grunt.file.read(dependencies.ember, 'utf8'));

      templateBuilder = new EmberBuilder(window, {
        rootPath: options.root
      });

    } else {

      templateBuilder = new VanillaBuilder(window, {
        rootPath: options.root
      });
    }

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {
      var templates;
      templates = [];
      f.src.filter(fileExists).forEach(function(filepath) {
        var src;
        src = grunt.file.read(filepath);
        try {
          templates.push(templateBuilder.build(src, filepath));
        } catch (e) {
          grunt.fail.warn(e);
          grunt.fail.warn("Emblem failed to compile " + filepath + ".");
        }
      });

      if (templates.length < 1) {
        grunt.log.warn("Destination not written because compiled files were empty.");
      } else {
        writeOutput(templates, f, options.separator);
      }
    });
  });

  //-------------------------------
  // Filters out missing files
  //------------------------------
  var writeOutput = function(output, file, separator) {
    grunt.file.write(file.dest, output.join(grunt.util.normalizelf(separator)));
    grunt.log.writeln("File \"" + file.dest + "\" created.");
  };

  //----------------------------------
  // Filters out missing files
  //----------------------------------
  var fileExists = function(filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn("Source file \"" + filepath + "\" not found.");
      return false;
    } else {
      return true;
    }
  };


  // SETUP CLASS STYLE INHERITANCE
  var __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  //----------------------------------
  // TemplateBuilder
  // Abstract class for building templates
  //----------------------------------
  var TemplateBuilder = (function() {

    function TemplateBuilder(window, options) {
      if (options == null) {
        options = {};
      }
      this.window = window;
      this.rootPath = options != null ? options.rootPath : void 0;
    }

    TemplateBuilder.prototype.keyForFilePath = function(filepath) {
      return filepath.replace(new RegExp('\\\\', 'g'), '/').replace(/\.\w+$/, '').replace(this.rootPath, '');
    };

    return TemplateBuilder;

  })();

  //----------------------------------
  // EmberBuilder
  // Builder for ember templates
  //----------------------------------
  var EmberBuilder = (function(_super) {

    __extends(EmberBuilder, _super);

    function EmberBuilder() {
      return EmberBuilder.__super__.constructor.apply(this, arguments);
    }

    EmberBuilder.prototype.build = function(src, filepath) {
      var compiled, key, template;
      key = JSON.stringify(this.keyForFilePath(filepath));
      compiled = this.window.Emblem.precompile(this.window.Ember.Handlebars, src);
      template = "Ember.Handlebars.template(" + compiled + ")";
      return "Ember.TEMPLATES[" + key + "] = " + template + ";";
    };

    return EmberBuilder;

  //----------------------------------
  // VanillaBuilder
  // Builder for vanilla handlebars templates
  //----------------------------------
  })(TemplateBuilder);

  var VanillaBuilder = (function(_super) {

    __extends(VanillaBuilder, _super);

    function VanillaBuilder() {
      return VanillaBuilder.__super__.constructor.apply(this, arguments);
    }

    VanillaBuilder.prototype.build = function(src, filepath) {
      var content, key;
      key = this.keyForFilePath(filepath);
      content = this.window.Emblem.precompile(this.window.Handlebars, src);
      return "var templates = Handlebars.templates = Handlebars.templates || {};\ntemplates['" + key + "'] = Handlebars.template(" + content + ");";
    };

    return VanillaBuilder;

  })(TemplateBuilder);

};
