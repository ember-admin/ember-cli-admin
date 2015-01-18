var processTextContent = require('ember-cli-admin/lib/proccess-text-content');

module.exports = {
  description: 'Generates an acceptance test for a feature.',
  beforeInstall: function(options) {
    // processTextContent.bind(this)('app/app.js',
    //   {
    //     replace: {
    //       'ember/resolver': "ember-cli-admin/admin-resolver",
    //       'Resolver: Resolver': 'Resolver: AdminResolver',
    //       'import Resolver': 'import AdminResolver'
    //     }
    //   });
    // processTextContent.bind(this)('app/templates/application.hbs',
    //   {
    //     replace: {
    //       '<h2 id="title">Welcome to Ember.js</h2>\n\n{{outlet}}': "{{partial 'admin/index'}}"
    //     }
    //   });
    processTextContent.bind(this)('app/router.js',
      {
        replace: {
          "Router.map(function() {": "Router.map(function() {\n\treturn this.route(\"dashboard\", {path: \"/\"});"
        },
        insert: {
          "import config from './config/environment';": "\nimport MetaRoute from 'ember-cli-admin/dsl/meta-route';",
          "Router.map(function() {\n\treturn this.route(\"dashboard\", {path: \"/\"});\n});\n": "\nMetaRoute.map(Router, function() {\n});"
        }
      });
    // var appName = "\nappName: '" + options.entity.name + "'";
    // processTextContent.bind(this)('config/environment.js',
    //   {
    //     insert: {
    //       "EmberENV: {": appName
    //     }
    //   });

  }
};
