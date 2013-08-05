Admin.Base.Views.BaseActionView = Ember.View.extend

  confirm: ->
    $('.modal').modal('hide')

  _showConfirmation: ->
    modalView = Ember.View.views[@_modalId()]
    modalView.set('action', @get('context'))
    modalView.set('target', @)
    $('.modal').modal({})

  _modalId: ->
    $(".modal").attr('id')