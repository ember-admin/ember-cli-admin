module.exports = {
  description: 'Generates an acceptance test for a feature.',
  beforeInstall: function() {
    this.insertIntoFile('app/app.js',
      "import AdminResolver from 'ember-cli-admin/admin-resolver';", {
        after: "import config from './config/environment';" + "\n"
      });

  }
};
