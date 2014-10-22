`import Ember from 'ember';`
`import MetaRoute from 'ember-cli-admin/dsl/meta-route';`
`import App from 'dummy/app';`

Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map ->
  @route "dashboard", path: "/"

MetaRoute.map Router, ->
  @resources "users"
  @resources "cars"
  @resources "user-categories"

`export default Router;`
