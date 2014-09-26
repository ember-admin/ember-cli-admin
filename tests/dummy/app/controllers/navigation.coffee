`import Ember from 'ember';`
`import Navigation from 'dummy/dsl/navigation';`
navigationController = Ember.ArrayController.extend
  activeMenu: "dashboard"

  content: Navigation.content
`export default navigationController;`