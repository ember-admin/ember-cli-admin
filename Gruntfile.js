module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: {
                    'dist/ember-admin.js': [
                      'src/application/resolver.coffee',
                      'src/application/admin.coffee',
                      'src/application/namespace.coffee',
                      'src/application/dsl/*.coffee',
                      'src/application/mixins/**/*.coffee',
                      'src/application/routes/main_route.coffee',
                      'src/application/config.coffee',
                      'src/application/navigation.coffee',
                      'src/application/views/base/actions/base_action_view.coffee',
                      'src/application/controllers/base/admin_base_controller.coffee',
                      'src/application/controllers/base/admin_table_view_controller.coffee',
                      'src/application/forms/*.coffee',
                      'src/application/helpers/*.coffee',
                      'src/application/views/**/*.coffee',
                      'src/application/router.coffee',
                      'src/application/routes/**/*.coffee',
                      'src/application/controllers/**/*.coffee',
                      'src/application/form_config.coffee',
                      'src/application/adapters/*.coffee'
                    ],

                    'spec/ember-admin_spec.js': [
                        'spec/env.coffee',
                        'spec/**/*.coffee'
                    ]
                }
            }
        },

//        emblem: {
//            compile: {
//                files: {
//                    'src/templates/javascript/templates.js': ['src/templates/emblem/*.emblem']
//                },
//                options: {
//                    root: 'src/templates/emblem/',
//                    dependencies: {
//                        jquery: 'vendor/jquery.js',
//                        ember: 'vendor/ember.js',
//                        emblem: 'vendor/emblem.js',
//                        handlebars: 'vendor/handlebars.js'
//                    }
//                }
//            }
//        },

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
                    'vendor/jquery.js',
                    'vendor/handlebars.js',
                    'vendor/ember.js',
                    'vendor/ember-data.js',
                    'src/ember-easyForm.js',
                    'src/jquery.cookie.js',

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
    grunt.registerTask('default', ['coffee']);
    grunt.registerTask('spec', ['coffee', 'jasmine:pivotal']);
};