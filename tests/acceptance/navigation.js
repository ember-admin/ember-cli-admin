module('Acceptance tests: Navigation', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Dashboard should be active', function(){
  expect(1);
  visit('/').then(function(){
    var title = find('h1');
    equal(title.text(), 'Dashboard');
  });
});

