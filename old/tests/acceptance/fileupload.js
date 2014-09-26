module('Acceptance tests: FileUploads', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'advanceReadiness');
    Ember.run(App, 'destroy');
  }
});

test('Appear in popup window', function(){
  expect(1);
  visit('persons').then(function(){
    click("div.main-content > table > tbody tr > td img:first").then(function(){
      var url = find("#FileUploadModal .modal-body img").attr("src");
      andThen(function(){
        equal(url, "http://ru.gravatar.com/userimage/59502193/f61112c5023fc6a9b5b20a620cffa587.png");
      });
    });
  });
});