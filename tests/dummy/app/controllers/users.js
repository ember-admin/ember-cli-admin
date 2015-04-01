import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';
import SearchLogic from 'ember-cli-admin/dsl/search';
import Ember from 'ember';
var usersController;

usersController = Ember.Controller.extend(TableViewController, {
  sortFields: ['id', 'name'],
  formAttributes: ['email', 'name'],
  searchForm: (function() {
    return new SearchLogic().form(this.get('q'), function() {
      this.input('email');
      this.input('name', {type: 'select', selectContent: ["Foo", "Bar"], prompt: 'Select Name'});
      this.input('birthdate', {type: 'date', placeholder: "Select birthdate", format: "dd MM, yyyy"});
      return this.input('nickname', {
        type: 'autocomplete',
        url: '/api/users/autocomplete',
        displayKey: 'name'
      });
    });
  }).property('q'),
  actions: {
    toggleActive: function(item) {
      item.toggleProperty('is_active');
    }
  }
});

export default usersController;
