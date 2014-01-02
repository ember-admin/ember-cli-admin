module('Acceptance tests: Batches', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Select all items in table', function(){
  expect(1);

  visit('persons').then(function(){
    click("#select-all-batches").then(function(){
      var checkBoxCount = find("table .ember-checkbox").size();
      var checkedElementsCount = find("table .ember-checkbox:checked").size();
      equal(checkedElementsCount, checkBoxCount);
    });
  });
});