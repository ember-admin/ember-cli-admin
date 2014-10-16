`import Ember from 'ember'`
`import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation'`

assetView = Ember.View.extend ConfirmationMixin,
  attributeBindings: ["templateName", 'property']

  actions:

    deleteAsset: ->
      @_showConfirmation()

    confirm: ->
      @_deleteAsset(@get('asset'), @get('parentView.single'))
      @_super()

  _deleteAsset: (asset, single) ->
    @get('controller').send('deleteAsset', asset, single, @get('property'))

  action: (->
    {title: 'Delete', confirm: "Are you sure you want to delete this?"}
  ).property()

`export default assetView`
