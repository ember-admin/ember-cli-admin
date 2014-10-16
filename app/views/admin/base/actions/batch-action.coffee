`import Ember from 'ember'`
`import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation'`

batchActionView = Ember.View.extend ConfirmationMixin,
  tagName: "li"

  click: (event) ->
    event.preventDefault()
    return if @get('controller.__batches.length') < 1
    if @get('context.confirm')
      @_showConfirmation(batch: true)
    else
      @_batchAction()

  _batchAction: ->
    @get('controller').send("baseBatchAction", @get('context.action'))

`export default batchActionView`