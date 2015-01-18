var fs = require('fs');
var path = require('path');
var renameFile = require('ember-cli-admin/lib/proccess-text-content').renameFile;
var jsonFile, packageJsonPath, properties, self;

module.exports = {
  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    renameFile.bind(this)('app/styles/app.css', 'app/styles/app.scss');

   packageJsonPath = path.join(this.project.root, 'package.json');
   jsonFile = require(packageJsonPath);
   properties = {
     "ember-cli-map": "0.2.2",
     "broccoli-merge-trees": "0.1.4",
     "broccoli-sass": "^0.2.2",
     "broccoli-static-compiler": "0.1.4",
     "ember-cli-coffeescript": "^0.1.0",
     "broccoli-coffee": "^0.1.1"
   };
   Object.keys(properties).forEach(function (key) {
     jsonFile.devDependencies[key] = properties[key];
   });
   fs.writeFileSync(packageJsonPath, JSON.stringify(jsonFile, null, 2));

   bowerFilePath = path.join(this.project.root, 'bower.json');
   bowerFile = require(bowerFilePath);
   bowerFile.dependencies["bootstrap-sass-official"] = "3.2.0";
   bowerFile.dependencies["typeahead.js"] = "twitter/typeahead.js#0.10.5";
   bowerFile.dependencies["jquery-ui-sortable"] =  "*";
   return fs.writeFileSync(bowerFilePath, JSON.stringify(bowerFile, null, 2));
  }
};
