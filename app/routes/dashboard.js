import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  redirect:function(model, transition) {
    if(!Ember.isEmpty(config.EmberENV.redirectFromDashboardTo)){
      this.transitionTo(config.EmberENV.redirectFromDashboardTo);
    }
  }
});
