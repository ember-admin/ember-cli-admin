var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-admin',

  included: function(app) {
    this.app = app;
    app.import(app.bowerDirectory + '/bootstrap-sass-official/assets/javascripts/bootstrap.js');
    app.import('vendor/fileicon.png', { destDir: 'assets/images' });
    app.import(app.bowerDirectory + '/typeahead.js/dist/bloodhound.min.js');
    app.import(app.bowerDirectory + '/typeahead.js/dist/typeahead.jquery.js');
    app.import(app.bowerDirectory + '/jquery-ui-sortable/jquery-ui-sortable.js');
    app.import(app.bowerDirectory + '/jquery-ui-touch-punch-improved/jquery.ui.touch-punch-improved.js');
    app.import('vendor/nested-sortable.js');
  },

  treeForPublic: function() {
    var bootstrapFonts = path.join(this.app.bowerDirectory, '/bootstrap-sass-official/assets/fonts/bootstrap');
    var bootstrapFontsTree = new Funnel(this.treeGenerator(bootstrapFonts), {
      srcDir: '/',
      destDir: '/fonts/bootstrap'
    });

    return bootstrapFontsTree;
  }
};
