Admin.Base.Views.BaseActionView = Ember.View.extend

  actions:

    confirm: ->
      Ember.View.views["ActionModal"].$().modal('hide')

  _showConfirmation: ->
    action =  @get('action') || @get('context')
    modalView = Ember.View.views["ActionModal"]
    modalView.set('action', action)
    modalView.set('target', @)
    modalView.$().modal({})