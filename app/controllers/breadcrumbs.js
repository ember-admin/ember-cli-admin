import Ember from 'ember';
import config from '../config/environment';

export default Ember.ArrayController.extend({
  caseType: config.caseType || 'title'
});
