`import TreeViewController from 'ember-cli-admin/mixins/controllers/tree-view'`

cataloguesController = Ember.ObjectController.extend(TreeViewController, {
  formAttributes: ['name']
})
`export default cataloguesController`