module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: {
                    'dist/ember-admin.js': [
                      'src/application/resolver.coffee',
                      'src/application/app.coffee',
                      'src/application/namespace.coffee',
                      'src/application/dsl/*.coffee',
                      'src/application/logics/*.coffee',
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
                      'src/application/routes/**/*.coffee',
                      'src/application/controllers/**/*.coffee',
                      'src/application/form_config.coffee',
                      'src/application/adapters/*.coffee'
                    ],

                    'spec/ember-admin_spec.js': [
                        'spec/env.coffee',
                        'spec/**/*.coffee'
                    ],
                    'dist/ember-admin-resolver.js':[
                      'src/application/resolver.coffee'
                    ]
                }
            }
        },

        emblem: {
            compile: {
                files: {
                    'dist/templates.js': ['src/application/templates/ember-admin/**/*.emblem']
                },
                options: {
                    root: 'src/application/templates/',
                    dependencies: {
                        jquery: 'vendor/jquery/jquery.js',
                        ember: 'vendor/ember/ember.js',
                        emblem: 'vendor/emblem/dist/emblem.js',
                        handlebars: 'vendor/handlebars/handlebars.js'
                    }
                }
            }
        },

        uglify: {
            options: { mangle: false, compress: false },

            dist: {
                src: ['src/ember-easyForm.js', 'vendor/jquery.cookie/jquery.cookie.js', 'dist/ember-admin.js', 'dist/templates.js'],
                dest: 'dist/ember-admin.min.js'
            }
        },

        jasmine: {
            pivotal: {
                src: [
                    'vendor/jquery/jquery.js',
                    'vendor/handlebars/handlebars.js',
                    'vendor/ember/ember.js',
                    'vendor/ember-data/ember-data.js',
                    'src/ember-easyForm.js',
                    'vendor/jquery.cookie/jquery.cookie.js',
                    'dist/ember-admin.js',
                    'dist/templates.js'
                ],

                options: {
                    specs: 'spec/ember-admin_spec.js'
                }
            }
        },

        curl: {
          ember: {
            src: 'http://builds.emberjs.com/canary/ember.js',
            dest: 'vendor/ember.js'
          },

          ember_data: {
            src: 'http://builds.emberjs.com/canary/ember-data.js',
            dest: 'vendor/ember-data.js'
          }
        },
        sass: {
            dist: {
                files: {
                    'dist/ember-admin.css': 'src/ember-admin.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-emblem');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-sass');


    grunt.registerTask('default', ['coffee', 'emblem', 'uglify', 'sass']);
    grunt.registerTask('spec', ['coffee', 'emblem', 'jasmine:pivotal']);
    grunt.registerTask('update_ember', ['curl:ember', 'curl:ember_data']);
};
