import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';
import Ember from 'ember';
var userCategoriesController;


userCategoriesController = Ember.Controller.extend(TableViewController, {
  caseType: 'title',
  sortAssetsBy: 'position'
});

export default userCategoriesController;
