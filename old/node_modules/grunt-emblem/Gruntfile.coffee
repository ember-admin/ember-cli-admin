require('coffee-script')

module.exports = (grunt) ->
  # Load this plugin's task(s)
  grunt.loadTasks('tasks')

  # load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    clean:
      test: ['tmp']

    emblem:
      ember:
        files:
          'tmp/emblem-ember.js': [
            'test/fixtures/_partial1.emblem',
            'test/fixtures/emblem-ember.emblem'
          ]
        options:
          root: 'test/fixtures/'
          dependencies:
            jquery: 'test/vendor/jquery-1.9.1.js'
            ember: 'test/vendor/ember-1.0.0-rc.1.js'
            emblem: 'test/vendor/emblem.js'
            handlebars: 'test/vendor/handlebars-1.0.0-rc.3.js'
      basic:
        files:
          'tmp/emblem-basic.js': ['test/fixtures/emblem-basic.emblem']
        options:
          root: 'test/fixtures/'
          dependencies:
            emblem: 'test/vendor/emblem.js'
            handlebars: 'test/vendor/handlebars-1.0.0-rc.3.js'

    simplemocha:
      options:
        globals: ['should', 'helpers']
        timeout: 3000
        ignoreLeaks: false
        ui: 'bdd'
        reporter: 'spec'
        require: 'test/test_helper.coffee'

      all:
        src: ['test/test_helper.coffee','test/**/*.coffee']

  # Load the plugin that provides the "uglify" task.
  grunt.registerTask('test', ['clean', 'emblem', 'simplemocha:all'])

  # Default task(s).
