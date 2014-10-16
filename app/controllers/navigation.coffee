`import Ember from 'ember';`
`import Navigation from 'ember-cli-admin/dsl/navigation';`

navigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  model: Navigation.content

  siteTitle: 'Ember Admin'

`export default navigationController;`