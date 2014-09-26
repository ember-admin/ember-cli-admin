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
                      'src/application/views/base/actions/base_action_view.coffee',
                      'src/application/controllers/base/admin_base_controller.coffee',
                      'src/application/controllers/base/admin_table_view_controller.coffee',
                      'src/application/forms/*.coffee',
                      'src/application/helpers/*.coffee',
                      'src/application/views/**/*.coffee',
                      'src/application/routes/**/*.coffee',
                      'src/application/controllers/**/*.coffee',
                      'src/application/form_config.coffee',
                      'src/application/adapters/*.coffee',
                      'src/application/decorators/*.coffee'
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
                        ember: 'vendor/ember/ember.min.js',
                        emblem: 'vendor/emblem/dist/emblem.js',
                        handlebars: 'vendor/handlebars/handlebars.js'
                    }
                }
            }
        },

        uglify: {
            options: { mangle: false, compress: false },

            dist: {
                src: ['src/ember-easyForm.js', 'src/ember-easy-decorator.js', 'vendor/jquery.cookie/jquery.cookie.js', 'dist/ember-admin.js', 'dist/templates.js'],
                dest: 'dist/ember-admin.min.js'
            }
        },

        sass: {
            dist: {
                files: {
                    'dist/ember-admin.css': 'src/ember-admin.scss'
                }
            }
        },
        // karma:ci, karma:dev, karma:sever, karma:browsers in ./tasks/karma
        karma: require('./tasks/karma')
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dist', ['coffee', 'emblem', 'uglify', 'sass']);
    grunt.registerTask('test', ['coffee', 'emblem', 'uglify', 'sass', 'karma:ci']);
};
