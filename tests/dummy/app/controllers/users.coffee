`import TableViewController from 'ember-cli-admin/mixins/controllers/table-view'`
`import SearchLogic from 'ember-cli-admin/dsl/search'`

usersController = Ember.ObjectController.extend TableViewController,

  sortFields: ['id', 'name']

  formAttributes: ['email', 'name']

  searchForm: (->
    new SearchLogic().form(@get('q'), ->
      @input('email')
      @input('name')
      @input('nickname', type: 'autocomplete', url: '/api/users/autocomplete', displayKey: 'name')
    )
  ).property('q')

`export default usersController`
