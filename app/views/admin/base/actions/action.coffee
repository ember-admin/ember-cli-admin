`import Ember from 'ember'`
`import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation'`

actionView = Ember.View.extend ConfirmationMixin,
  classNameBindings: ["class"]
  attributeBindings: ["title"]

  class:(->
    @get('action.class')
  ).property('action')

  click: ->
    model = (@get('model') || @get('controller.model'))
    if @get('action.confirm')
      @_showConfirmation()
    else
      @get('controller').send('adminAction',@get('action.action'), model)

  actions:

    confirm: ->
      model = (@get('model') || @get('controller.model'))
      @get('controller').send(@get('adminAction','action.action'), model)
      @_super()

  action:(->
    if @get('breadcrumbAction')
      switch  @get('breadcrumbAction')
        when "new"
          @get('controller.actionNew')
        when "edit"
          @_findAction('Edit')
        when "destroy"
          @_findAction('Delete')
        when "show"
          @_findAction('Show')
        else ""
    else
      @get('context')
  ).property('context')

  title: (->
    @get('action.title')
  ).property('action')

  _findAction: (title) ->
    @get('controller.itemActions').find (action) =>
      action.title == title

  _findAdditionalActions: (title) ->
    @get('controller.additionalActions').find (action) =>
      action.title == title

`export default actionView`