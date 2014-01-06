module('Acceptance tests: FileUploads', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Appear in popup window', function(){
  expect(1);

  visit('persons').then(function(){
    debugger;
    click("div.main-content > table > tbody tr > td img:first").then(function(){
      var modal_status = find("#FileUploadModal").css( "display");
      equal(modal_status, "block");
    });
  });
});