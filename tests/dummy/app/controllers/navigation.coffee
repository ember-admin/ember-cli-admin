`import Ember from 'ember';`
`import Navigation from 'dummy/dsl/navigation';`
`import Config from 'dummy/config'`

navigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  model: Navigation.content

  siteTitle: Config.siteTitle

`export default navigationController;`