import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';
import Ember from 'ember';
var carsController;

carsController = Ember.ObjectController.extend(TableViewController);

export default carsController;