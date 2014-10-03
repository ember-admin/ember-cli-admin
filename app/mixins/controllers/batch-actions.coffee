`import Ember from 'ember';`

batchActionsMixin = Ember.Mixin.create
  __batches: []

  batchActions: [{title: "delete", confirm: "Are you sure you want to delete this?", action: "destroy"}]

  actions:

    baseBatchAction: (action) ->
      @get('__batches').forEach (model) =>
        @send(action, model, true)
      @set('__batches', [])

`export default batchActionsMixin;`