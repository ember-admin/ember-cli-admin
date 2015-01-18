var Promise = require('ember-cli/lib/ext/promise');
var fs = require('ember-cli/node_modules/fs-extra');
var path = require('path');
var writeFile = Promise.denodeify(fs.outputFile);

var replacePhrases = function(content, phrases){
  var contentsToWrite = content;

  return Object.keys(phrases).reduce(function(prev, next){
    var contentMarkerIndex = contentsToWrite.indexOf(next);
    if (contentMarkerIndex !== -1) {
      var replaceIndex = contentMarkerIndex;

      contentsToWrite = contentsToWrite.slice(0, replaceIndex) +
        phrases[next] +
        contentsToWrite.slice(replaceIndex + next.length);
      return contentsToWrite;
    }
  }, "");
};

module.exports = function(pathRelativeToProjectRoot, phrasesToReplace) {
  var fullPath = path.join(this.project.root, pathRelativeToProjectRoot);
  var originalContents = '';

  if (fs.existsSync(fullPath)) {
    originalContents = fs.readFileSync(fullPath, {
      encoding: 'utf8'
    });
  }

  var contentsToWrite = originalContents;
  contentsToWrite = replacePhrases(contentsToWrite, phrasesToReplace);
  // contentsToWrite = Object.keys(phrasesToReplace).reduce(function(prev, next){
  //   var contentMarkerIndex = contentsToWrite.indexOf(next);
  //   if (contentMarkerIndex !== -1) {
  //     var replaceIndex = contentMarkerIndex;

  //     contentsToWrite = contentsToWrite.slice(0, replaceIndex) +
  //       phrasesToReplace[next] +
  //       contentsToWrite.slice(replaceIndex + next.length);
  //     return contentsToWrite;
  //   }
  // },"");

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
