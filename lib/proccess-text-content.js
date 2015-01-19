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

var insertPhrases = function(content, phrases){
  var contentsToWrite = content;

  return Object.keys(phrases).reduce(function(prev, next){
    var contentMarkerIndex = contentsToWrite.indexOf(next);
    if (contentMarkerIndex !== -1) {
      var insertIndex = contentMarkerIndex + next.length;;

      contentsToWrite = contentsToWrite.slice(0, insertIndex) +
        phrases[next] +
        contentsToWrite.slice(insertIndex);
      return contentsToWrite;
    }
  }, "");
};
module.exports = {
  processTextContent: function(pathRelativeToProjectRoot, commands) {
    var fullPath = path.join(this.project.root, pathRelativeToProjectRoot);
    var originalContents = '';

    if (fs.existsSync(fullPath)) {
      originalContents = fs.readFileSync(fullPath, {
        encoding: 'utf8'
      });
    }

    var contentsToWrite = originalContents;
    if (commands.replace) {
      contentsToWrite = replacePhrases(contentsToWrite, commands.replace);
    }
    if (commands.insert) {
      contentsToWrite = insertPhrases(contentsToWrite, commands.insert);
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

  },
  renameFile: function(pathOld, pathNew){
    var fullPathOld = path.join(this.project.root, pathOld);
    var fullPathNew = path.join(this.project.root, pathNew);
    fs.rename(fullPathOld, fullPathNew, function(error){
      if(error) {
        return;
      }
    });
  }
};
