require('../lib/cli');
var path = require('path');

describe("CommandLineParser Tests", function() {

  it("returns templateName without handlebars extension when valid filepath passed in", function() {
    var tpl = path.join('file-system', 'app', 'templates', 'foo.handlebars');
    var sut = new Cli({args:[tpl]});
    result = sut.parseCommandLineArgs();
    expect(result['name']).toEqual('foo');
  });

  it("returns template content when valid filepath passed in and it exists on the filesystem", function() {
    var tpl = path.join('file-system', 'app', 'templates', 'foo.handlebars');
    var sut = new Cli({args:[tpl]});
    result = sut.parseCommandLineArgs();
    expect(result['content']).toEqual('{{outlet}}\n');
  });

  it("returns template content and name when file extension is handlebars", function() {
    var tpl = path.join('file-system', 'app', 'templates', 'tables', 'index.handlebars');
    var sut = new Cli({args:[tpl]});
    result = sut.parseCommandLineArgs();
    expect(result['content']).toEqual('{{outlet}}\n');
    expect(result['name']).toEqual('tables/index');
  });

  it("returns template content and name when file extension is hbs", function() {
    var tpl = path.join('file-system', 'app', 'templates', 'tables', 'other.hbs');
    var sut = new Cli({args:[tpl]});
    result = sut.parseCommandLineArgs();
    expect(result['content']).toEqual('{{outlet}}\n');
    expect(result['name']).toEqual('tables/other');
  });

});
