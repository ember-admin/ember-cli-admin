Admin.Base.Mixins.BatchActionsMixin = Ember.Mixin.create
  __batches: []

  batchActions: [{title: "delete", confirm: "Are you sure to delete this?", action: "destroy"}]

  actions:

    baseBatchAction: (action) ->
      @get('__batches').forEach (model) =>
        @send(action, model, true)
      @set('__batches', [])