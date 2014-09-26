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

test('Parent and child menus should be active', function(){
  expect(2);
  visit('/persons').then(function(){

    var activeMenu = find('.nav.navbar-nav li.dropdown.active > a');
    equal(activeMenu.text(), 'System');

    var childActiveMenu = find('.nav.navbar-nav .dropdown-menu li.active');
    equal(childActiveMenu.text(), 'Persons');
  });
});

