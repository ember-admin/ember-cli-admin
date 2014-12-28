`import Ember from 'ember';`
`import Navigation from 'ember-cli-admin/dsl/navigation';`

navigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  model: Navigation.content

  siteTitle: Ember.ENV.appName || 'Ember Admin'

`export default navigationController;`