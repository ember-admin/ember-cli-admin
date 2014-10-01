`import Ember from 'ember';`
baseActionView = Ember.View.extend

  actions:

    confirm: ->
#      Ember.View.views["ActionModal"].$().modal('hide')

  _showConfirmation: ->
    action =  @get('action') || @get('context')
    @get('controller').send('openModal', Ember.Object.create(actionData: action, model: @get('model')))

`export default baseActionView;`