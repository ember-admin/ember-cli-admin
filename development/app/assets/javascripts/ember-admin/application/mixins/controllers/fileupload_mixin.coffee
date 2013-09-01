###
  You can override this method for create your own logic for create asset
###
Admin.Base.Mixins.FileUploadMixin = Ember.Mixin.create

  actions:

    createAsset: (asset, property, view) ->
      transaction = asset.get('store').transaction()
      transaction.add asset
      transaction.commit()

      asset.addObserver 'id', (sender, key, value, context, rev) =>
        view.set('creating', false)
        view.clearInput()
        if view.get('single')
          @_createBelongsTo(asset, property)
        else
          @_createHasMany(asset, property)

  _createBelongsTo: (asset, property) ->
    @get("model").set(property, asset)
    if @get('model.isDirty')
      if @get('model.id')
        state = DS.RootState.loaded.saved
        @get("model").set('currentState', state)

  _createHasMany: (asset, property) ->
    @get("model.#{property}").pushObject(asset)


