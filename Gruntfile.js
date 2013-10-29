module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: {
                    'dist/ember-admin.js': [

                    ],

                    'spec/ember-admin_spec.js': [
                        'spec/env.coffee',
                        'spec/*.coffee'
                    ]
                }
            }
        },

        emblem: {
            compile: {
                files: {
                    'src/templates/javascript/templates.js': ['src/templates/emblem/*.emblem']
                },
                options: {
                    root: 'src/templates/emblem/',
                    dependencies: {
                        jquery: 'vendor/jquery.js',
                        ember: 'vendor/ember.js',
                        emblem: 'vendor/emblem.js',
                        handlebars: 'vendor/handlebars.js'
                    }
                }
            }
        },

        uglify: {
            options: { mangle: false, compress: false },

            dist: {
                src: 'dist/ember-admin.js',
                dest: 'dist/ember-admin.min.js'
            }
        },

        jasmine: {
            pivotal: {
                src: [
                    'vendor/assets/javascripts/jquery.js',
                    'vendor/assets/javascripts/handlebars.js',
                    'vendor/assets/javascripts/ember.js',
                    'vendor/assets/javascripts/ember-data.js',

                    'dist/ember-admin.js'
                ],

                options: {
                    specs: 'spec/ember-admin_spec.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-emblem');


    grunt.registerTask('default', ['coffee', 'uglify']);
    grunt.registerTask('spec', ['coffee', 'jasmine:pivotal']);
};