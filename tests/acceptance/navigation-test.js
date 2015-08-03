import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Navigation', {
    beforeEach: function(){
        App = startApp();
    },
    afterEach: function(){
        Ember.run(App, 'destroy');
    }
});

test('navigation bar title displays application name', function(assert) {
    assert.expect(1);
    visit('/');

    andThen(function(){
        assert.equal(find('.navbar-brand').text(), 'Sample App Name');
    });
});

test('title link points to destination provided via config file', function(assert) {
    assert.expect(1);
    visit('/');

    andThen(function(){
        assert.equal(find('.navbar-brand').attr('href'), '/example/url');
    });
});

test('navigation dropdown menu is opened by click', function(assert) {
  assert.expect(1);
  visit('/');

  andThen(function(){
    assert.ok(find('[data-toggle="dropdown"]').trigger('click').parent('.dropdown').hasClass('open'),'dropdown menu is open');
  });
});

test('navigation dropdown menu сontains elements', function(assert) {
  assert.expect(3);
  visit('/');

  andThen(function(){
    let dropdownElement = $("li.dropdown");
    assert.equal(dropdownElement.find('li a').length, 2, '2 menu items in dropdown menu');
    assert.equal(dropdownElement.find('li a').eq(0).attr('href'), '#/users', "href /users is contained in menu");
    assert.equal(dropdownElement.find('li a').eq(1).attr('href'), '#/user-categories', "href /user-categories is contained in menu");
  });
});
