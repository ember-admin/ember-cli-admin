`import BaseActionView from 'dummy/views/base/actions/base-action';`

assetView = BaseActionView.extend
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
    {title: 'Delete', confirm: "Are you shure delete this?"}
  ).property()

`export default assetView;`
