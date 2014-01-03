module('Table tests: Batches', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

//test('Table should have actions and itams', function(){
//  visit('persons').then(function(){
//
//  });
//});