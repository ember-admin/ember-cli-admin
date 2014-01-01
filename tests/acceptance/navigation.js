module('Acceptance tests: Navigation', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Dashboard should be active', function(){
  expect(2);
  visit('/').then(function(){
    var title = find('h1');
    equal(title.text(), 'Dashboard');
    var activeMenu = find('.nav.navbar-nav li.active');
    equal(activeMenu.text(), 'Dashboard');
  });
});

