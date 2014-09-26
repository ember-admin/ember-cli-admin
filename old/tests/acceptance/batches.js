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

  visit('persons');
  click("#select-all-batches");
  var checkBoxCount = find("table .ember-checkbox").size();
  var checkedElementsCount = find("table .ember-checkbox:checked").size();
  equal(checkedElementsCount, checkBoxCount);
});

test('Un select all items in table', function(){
  expect(1);
  visit('persons');
  click("#select-all-batches");
  click("#select-all-batches");
  var checkedElementsCount = find("table .ember-checkbox:checked").size();
  equal(checkedElementsCount, 0);
});

test('Delete batch action', function(){
  expect(4);
  visit('persons');
  click("#select-all-batches");
  click(".btn-group.batch-actions > a");
  andThen(function(){
    var actionElement = find(".btn-group.batch-actions.open ul");
    equal(actionElement.text(), 'delete');
    click(".btn-group.batch-actions.open ul li a");
    var modalElement = find(".modal-header");
    equal(modalElement.text(), "×delete×");
    click(".modal-footer  .btn.btn-primary");
    andThen(function(){
      var tableItems = find("table tr").size();
      equal(tableItems, 2);
      var emptyText = find("table tr:last").text();
      equal(emptyText, 'Empty');
    });
  });
});

test('Close modal window', function(){
  expect(2);
  visit('persons');
  click("#select-all-batches");
  click(".btn-group.batch-actions > a");
  click(".btn-group.batch-actions.open ul li a").then(function(){
  andThen(function(){
    var modalElement = find(".modal-header");
    equal(modalElement.text(), "×delete×");
    click(".modal-footer  .btn.btn-default").then(function(){
      var style = find("#ActionModal").attr('style');
      equal(modalElement.text(), "×delete×");
    });
  });
});
});

