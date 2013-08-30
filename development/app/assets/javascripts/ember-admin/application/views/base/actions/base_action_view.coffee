Admin.Base.Views.BaseActionView = Ember.View.extend

  actions:

    confirm: ->
      $('.modal').modal('hide')

  _showConfirmation: ->
    action =  @get('action') || @get('context')
    modalView = Ember.View.views[@_modalId()]
    modalView.set('action', action)
    modalView.set('target', @)
    $('.modal').modal({})

  _modalId: ->
    $(".modal").attr('id')