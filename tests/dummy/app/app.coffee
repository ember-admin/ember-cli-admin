`import Ember from 'ember';`
`import AdminResolver from 'ember-cli-admin/admin-resolver';`
`import loadInitializers from 'ember/load-initializers';`

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend
  modulePrefix: 'dummy', #TODO: loaded via config
  Resolver: AdminResolver

loadInitializers(App, 'dummy');

`export default App;`
