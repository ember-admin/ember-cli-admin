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

test('Un select all items in table', function(){
  expect(1);
  visit('persons').then(function(){
    click("#select-all-batches").then(function(){
      click("#select-all-batches").then(function(){
        var checkedElementsCount = find("table .ember-checkbox:checked").size();
        equal(checkedElementsCount, 0);
      });
    });
  });
});

test('Delete batch action', function(){
  expect(4);
  visit('persons').then(function(){
    click("#select-all-batches").then(function(){
      click(".btn-group.batch-actions > a").then(function(){
        var actionElement = find(".btn-group.batch-actions.open ul");
        equal(actionElement.text(), 'delete');
        click(".btn-group.batch-actions.open ul li a").then(function(){
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
    });
  });
});

//test('Close modal window', function(){
//  expect(2);
//  visit('persons').then(function(){
    //Todo check for modal window close when click cancel
//  });
//});

