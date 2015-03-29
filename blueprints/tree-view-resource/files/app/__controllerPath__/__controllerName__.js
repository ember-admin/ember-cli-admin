import Ember from 'ember';
import TreeViewController from 'ember-cli-admin/mixins/controllers/tree-view';

export default Ember.ObjectController.extend(TreeViewController, {
  formAttributes: ['name']
});
