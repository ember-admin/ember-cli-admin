var replaceInFile = require('ember-cli-admin/lib/replace-in-file');

module.exports = {
  description: 'Generates an acceptance test for a feature.',
  beforeInstall: function() {
    replaceInFile.bind(this)('app/app.js',
      {
        'ember/resolver': "ember-cli-admin/admin-resolver",
        'Resolver: Resolver': 'Resolver: AdminResolver',
        'import Resolver': 'import AdminResolver'
      });
  }
};
