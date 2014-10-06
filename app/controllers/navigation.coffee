`import Ember from 'ember';`
`import Navigation from 'emberadmin/dsl/navigation';`
`import Config from '../config'`

navigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  model: Navigation.content

  siteTitle: Config.siteTitle

`export default navigationController;`