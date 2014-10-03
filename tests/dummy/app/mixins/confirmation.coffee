`import Ember from 'ember';`

confirmationMixin = Ember.Mixin.create

  actions:

    _showConfirmation: ->
      action =  @get('action') || @get('context')
      @get('controller').send('openModal', Ember.Object.create(actionData: action, model: @get('model')))

`export default confirmationMixin;`