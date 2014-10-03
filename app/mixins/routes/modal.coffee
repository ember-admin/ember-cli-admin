`import Ember from 'ember';`

modalMixin = Ember.Mixin.create
  actions:
    openModal:  (item, modalName='base.confirm-modal') ->
      @set('controller.modalObject', item)
      @render modalName,
        outlet: "modal"

    confirm: ->
      modelObject = @get('controller.modalObject')
      if modelObject.get('options').batch
        @get('controller').send('baseBatchAction', modelObject.get('actionData.action'))
      else
        @get('controller').send(modelObject.get('actionData.action'), modelObject.get('model'))
      @send('closeModal')

    closeModal: ->
      @set('controller.modalItem', null)
      @disconnectOutlet
        outlet: "modal"

`export default modalMixin`