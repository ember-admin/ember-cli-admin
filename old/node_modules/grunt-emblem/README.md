# grunt-emblem

A grunt task for the [Emblem](http://emblemjs.com) templating language.

##Getting started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-emblem --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-emblem');
```


### Options

#### dependencies
Type: `Object`

In order to avoid conflicts with your existing libraries this plugin does not provide it's own copies of handlebars, ember, emblem, or jquery. Specify the paths to your own copies in the grunt options for each of the following:

 - handlebars
 - emblem
 - ember (optional)
 - jquery (only required if using ember)

#### root
Type: `String`

Specify the path to your template folder. This is only used when
registering the template names. For example if your template is at the path
`app/templates/posts/teaser.emblem` and `app/templates` is set as your root
then the template's name will be `posts/teaser`

#### separator (optional)
Type: `String`

Default: `linefeed`

Concatenated files will be joined on this string.

### Example Configuration

#### Ember.js

    grunt.initConfig({
      emblem: {
        compile: {
          files: {
            'path/to/result.js': 'path/to/source.emblem', //1:1 compile
            'path/to/another.js': ['path/to/sources/*.emblem', 'path/to/more/*.emblem'] //compile and concat into single file
          },
          options: {
            root: 'app/templates/',
            dependencies: {
              jquery: 'vendor/jquery-1.9.1.js',
              ember: 'vendor/ember-1.0.0-rc.1.js',
              emblem: 'vendor/emblem.js',
              handlebars: 'vendor/handlebars-1.0.0-rc.3.js'
            }
          }
        }
      }
    });

#### Vanilla Handlebars.js

    grunt.initConfig({
      emblem: {
        compile: {
          files: {
            'path/to/result.js': 'path/to/source.emblem', //1:1 compile
            'path/to/another.js': ['path/to/sources/*.emblem', 'path/to/more/*.emblem'] //compile and concat into single file
          },
          options: {
            root: 'app/templates/',
            dependencies: {
              emblem: 'vendor/emblem.js',
              handlebars: 'vendor/handlebars-1.0.0-rc.3.js'
            }
          }
        }
      }
    });
