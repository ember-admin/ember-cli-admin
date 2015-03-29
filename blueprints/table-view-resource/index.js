var inflection = require('ember-cli/node_modules/inflection');
var processTextContent = require('ember-cli-admin/lib/proccess-text-content').processTextContent;
var path = require('path');

module.exports = {
  description: 'Generates tableview resource',

  fileMapTokens: function() {
    return {
      __modelName__: function(options) {
        if (options.pod) {
          return "model";
        }
        return inflection.singularize(options.dasherizedModuleName);
      },
      __controllerName__: function(options){
        if (options.pod) {
          return "controller";
        }
        return inflection.pluralize(options.dasherizedModuleName);
      },
      __controllerPath__: function(options) {
        if (options.pod) {
          return path.join(options.podPath,  inflection.pluralize(options.dasherizedModuleName));
        }
        return 'controllers';
      },
      __modelPath__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, inflection.singularize(options.dasherizedModuleName));
        }
        return 'models';
      }
    };
  },
  beforeInstall: function(options){
    var process = processTextContent.bind(this);
    var entityName = options.entity.name;
    var navigationStr = '\n\t\tthis.navigate("' + inflection.titleize(entityName) + '", { route: "' + entityName + '" });'
    var routerStr = '\n\tthis.resources("' + entityName + '");'
    process('app/initializers/navigation.js',
      {
        insert: {
          'this.navigate("Dashboard", { route: "dashboard" });': navigationStr
        }
      });
    process('app/router.js',
      {
        insert: {
          'MetaRoute.map(Router, function() {': routerStr
        }
      });
  }
};
