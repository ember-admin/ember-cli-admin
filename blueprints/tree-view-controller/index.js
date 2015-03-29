var path = require('path');

module.exports = {
  description: 'Generates tree-view controller.',
  fileMapTokens: function() {
    return {
      __path__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        return 'controllers';
      },
      __name__: function(options) {
        if (options.pod) {
          return "controller";
        }
        return options.dasherizedModuleName;
      }
    };
  }
};
