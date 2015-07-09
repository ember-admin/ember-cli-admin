import Ember from 'ember';

export default Ember.Mixin.create({
  __batches: Ember.A(),
  batchActions: Ember.A([{
    title: "delete",
    confirm: "Are you sure you want to delete this?",
    action: "destroy"
  }]),
  actions: {
    baseBatchAction(action) {
      this.get('__batches').forEach(model => {
        return this.send(action, model, true);
      });
      return this.set('__batches', Ember.A());
    }
  }
});
