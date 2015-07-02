import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';
import Ember from 'ember';

export default Ember.Controller.extend(TableViewController, {
  isShowSearchForm: false,
  isShowSidebar: false,
});
