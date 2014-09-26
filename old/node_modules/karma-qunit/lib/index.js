var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initQUnit = function(files) {
  files.unshift(createPattern(__dirname + '/adapter.js'));
  files.unshift(createPattern(require.resolve('qunitjs')));
};

initQUnit.$inject = ['config.files'];

module.exports = {
  'framework:qunit': ['factory', initQUnit]
};
