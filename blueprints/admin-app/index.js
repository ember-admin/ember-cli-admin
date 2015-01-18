var Promise = require('ember-cli/lib/ext/promise');
var fs = require('ember-cli/node_modules/fs-extra');
var path = require('path');
var writeFile = Promise.denodeify(fs.outputFile);
var EOL = require('os').EOL;

var replaceInFile = function(pathRelativeToProjectRoot, contentsToInsert, contentsToReplace) {
  var fullPath = path.join(this.project.root, pathRelativeToProjectRoot);
  var originalContents = '';

  if (fs.existsSync(fullPath)) {
    originalContents = fs.readFileSync(fullPath, {
      encoding: 'utf8'
    });

  }

  var contentsToWrite = originalContents;

  var contentMarkerIndex = contentsToWrite.indexOf(contentsToReplace);

  if (contentMarkerIndex !== -1) {
    var replaceIndex = contentMarkerIndex;

    contentsToWrite = contentsToWrite.slice(0, replaceIndex) +
      contentsToInsert + EOL +
      contentsToWrite.slice(replaceIndex+contentsToReplace.length);

  }

  var returnValue = {
    path: fullPath,
    originalContents: originalContents,
    contents: contentsToWrite,
    inserted: false
  };

  if (contentsToWrite !== originalContents) {
    returnValue.inserted = true;

    return writeFile(fullPath, contentsToWrite)
      .then(function() {
        return returnValue;

      });

  } else {
    return Promise.resolve(returnValue);

  }

};

module.exports = {
  description: 'Generates an acceptance test for a feature.',
  beforeInstall: function() {
    // this.insertIntoFile('app/app.js',
    //   "import AdminResolver from 'ember-cli-admin/admin-resolver';", {
    //     after: "import config from './config/environment';" + "\n"
    //   });
    replaceInFile.bind(this)('app/app.js', 'Resolver: AdminResolver',  'Resolver: Resolver');

  }
};
