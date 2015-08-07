import Ember from 'ember';
import BaseRoute from 'ember-cli-admin/mixins/routes/base';
import config from '../config/environment';

export default Ember.Route.extend(BaseRoute,{
  // We use that redirect hook for redirection into the setted route in config file.
  // Route is setted by property ENV.redirectFromDashboardTo.
  redirect:function(model, transition) {
    if(!Ember.isEmpty(config.redirectFromDashboardTo)){
      this.transitionTo(config.redirectFromDashboardTo);
    }
  }
});
