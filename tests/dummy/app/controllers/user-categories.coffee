`import TableViewController from 'ember-cli-admin/mixins/controllers/table-view'`

userCategoriesController = Ember.ObjectController.extend(TableViewController, {
  caseType: 'title'
});
`export default userCategoriesController`