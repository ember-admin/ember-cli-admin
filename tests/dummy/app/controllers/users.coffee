`import TableViewController from 'ember-cli-admin/mixins/controllers/table-view'`
`import SearchLogic from 'ember-cli-admin/dsl/search'`

usersController = Ember.ObjectController.extend TableViewController,
  useFirstLetterUpper: true,

  sortFields: ['id', 'name']

  formAttributes: ['email', 'name']

  searchForm: (->
    new SearchLogic().form(@get('q'), ->
      @input('email')
      @input('name')
      @input('nickname', type: 'autocomplete', url: '/api/users/autocomplete', displayKey: 'name')
    )
  ).property('q')

  actions:
    toggleActive: (item) ->
      item.toggleProperty('is_active')
      return

`export default usersController`
