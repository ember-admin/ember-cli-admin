var sut = require('../lib/main');
var fs = require('fs');
var path = require('path');

describe("ember-template-compiler tests", function() {

  it("compiles down a handlebars template", function() {
    var template = fs.readFileSync(path.join(path.dirname(fs.realpathSync(__filename)),'file-system', 'app', 'templates', 'foo.handlebars')).toString();
    var result = sut.precompile(template).toString();
    expect(result).toContain("outlet");
  });

});
