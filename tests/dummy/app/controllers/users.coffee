`import TableViewController from 'ember-cli-admin/mixins/controllers/table-view'`
`import SearchLogic from 'ember-cli-admin/dsl/search'`

usersController = Ember.ObjectController.extend TableViewController,


  sortFields: ['id', 'name']

  formAttributes: ['email', 'name']

  searchForm: (->
    new SearchLogic().form(@get('q'), ->
      @input('email')
      @input('name')
    )
  ).property('q')
##  additionalActions: [
##    {
##      title: "clone",
##      "class": "btn btn-small btn-warning",
##      action: "clone",
##      iconClass: "glyphicon glyphicon-plus",
##      confirm: "Are you sure clone this without relations???"
##    }
##  ]
##  actions:
##    clone: (model) ->
##      json = model.serialize()
##      #remove relations
##      @_removeRelations(json)
##      json.email = "clone_%@".fmt(json.email)
##      newModel = this.store.createRecord('user', json)
##      newModel.save().then =>
##        @get('model.items').insertAt(0, newModel)
##  _removeRelations: (json) ->
##    delete json.address
##    delete json.avatar
##    delete json.avatars
#
`export default usersController`