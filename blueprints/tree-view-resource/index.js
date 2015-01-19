var inflection = require('ember-cli/node_modules/inflection');
var processTextContent = require('ember-cli-admin/lib/proccess-text-content').processTextContent;

module.exports = {
  description: 'Generates treeview resource',

  locals: function(options){
    var modelName = inflection.camelize(inflection.singularize(options.entity.name), true);
    return {
      modelName: modelName
    };
  },

  fileMapTokens: function() {
    return {
      __modelname__: function(options) {
        return inflection.singularize(options.dasherizedModuleName);
      }
    };
  },
  beforeInstall: function(options){
    var process = processTextContent.bind(this);
    var entityName = options.entity.name;
    var navigationStr = '\n\t\t\tthis.navigate("' + inflection.titleize(entityName) + '", { route: "' + entityName + '"  });'
    var routerStr = '\n\tthis.resources("' + entityName + '");'
    process('app/initializers/navigation.js',
      {
        insert: {
          'this.navigate("Dashboard", { route: "dashboard"  });': navigationStr
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
