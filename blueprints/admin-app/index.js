var processTextContent = require('ember-cli-admin/lib/proccess-text-content');

module.exports = {
  description: 'Generates an acceptance test for a feature.',
  beforeInstall: function() {
    processTextContent.bind(this)('app/app.js',
      {
        replace: {
          'ember/resolver': "ember-cli-admin/admin-resolver",
          'Resolver: Resolver': 'Resolver: AdminResolver',
          'import Resolver': 'import AdminResolver'
        }
      });
  }
};
