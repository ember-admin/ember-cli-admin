var inflection = require('ember-cli/node_modules/inflection');
var chalk = require('ember-cli/node_modules/chalk');
var path = require('path');

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
      },
      __root__: function(options) {
        if (options.inRepoAddon) {
          return path.join('lib', options.inRepoAddon, 'addon');
        }

        if (options.inDummy) {
          return path.join('tests', 'dummy', 'app');
        }

        if (options.inAddon) {
          return 'addon';
        }

        return 'app';
      }
    };
  },
  afterInstall: function(options) {
    var entityName = options.entity.name;
    var navigationStr = '\n  this.navigate("' + inflection.titleize(entityName) + '", { route: "' + entityName + '" });'
    var routerStr = '\n  this.resources("' + entityName + '");'

    var self = this;

    return this.insertIntoFile('app/navigation.js', navigationStr, {
      after: '});'
    }).then(function() {
      return self.insertIntoFile('app/router.js', routerStr, {
        after: 'MetaRoute.map(Router, function() {'
      });
    }).then(function() {
      self._writeStatusToUI(chalk.green, '[ember-cli-admin] add tree-view-resource', entityName);
    });
  }
};
