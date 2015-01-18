var processTextContent = require('ember-cli-admin/lib/proccess-text-content').processTextContent;
var renameFile = require('ember-cli-admin/lib/proccess-text-content').renameFile;

module.exports = {
  description: 'Generates an acceptance test for a feature.',
  beforeInstall: function(options) {
    var process = processTextContent.bind(this);
    renameFile.bind(this)('app/styles/app.css', 'app/styles/app.scss');
    process('app/app.js',
      {
        replace: {
          'ember/resolver': "ember-cli-admin/admin-resolver",
          'Resolver: Resolver': 'Resolver: AdminResolver',
          'import Resolver': 'import AdminResolver'
        }
      });
    process('app/templates/application.hbs',
      {
        replace: {
          '<h2 id="title">Welcome to Ember.js</h2>\n\n{{outlet}}': "{{partial 'admin/index'}}"
        }
      });
    process('app/router.js',
      {
        replace: {
          "Router.map(function() {": "Router.map(function() {\n\treturn this.route(\"dashboard\", {path: \"/\"});"
        },
        insert: {
          "import config from './config/environment';": "\nimport MetaRoute from 'ember-cli-admin/dsl/meta-route';",
          "Router.map(function() {\n\treturn this.route(\"dashboard\", {path: \"/\"});\n});\n": "\nMetaRoute.map(Router, function() {\n});"
        }
      });
    var appName = "\n\t\t\tappName: '" + options.entity.name + "',";
    process('config/environment.js',
      {
        insert: {
          "EmberENV: {": appName
        }
      });

  }
};
