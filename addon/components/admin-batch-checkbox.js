import Ember from 'ember';

var batchCheckbox = Ember.Checkbox.extend({
  selectAll: false,
  pushItem: Ember.observer('checked', function() {
    if (this.get('selectAll')) {
      return this._selectAllAction();
    }
    if (this.get('checked')) {
      return this._addItem(this.get('context'));
    } else {
      return this.get('batches').removeObject(this.get('context'));
    }
  }),
  observerForChangeBatchesCollection: Ember.observer('batches.@each', function() {
    return Ember.run.later((function(_this) {
      return function() {
        if (_this.get('batches').length === 0 && _this.get('selectAll')) {
          return _this.set('checked', false);
        }
      };
    })(this), 300);
  }),
  _selectAllAction: function() {
    this.set('batches', Ember.A());
    if (!this.get('checked')) {
      return;
    }
    return this.get('items').forEach((function(_this) {
      return function(item) {
        return _this._addItem(item);
      };
    })(this));
  },
  _addItem: function(item) {
    if (this.get('batches').indexOf(item) < 0) {
      return this.get('batches').pushObject(item);
    }
  },
  changeBatchList: Ember.computed('batches.[]', {
    get: function() {
      if (this.get('selectAll')) {
        return;
      }
      return this.get('batches').indexOf(this.get('context')) >= 0;
    }
  }),
  createObserverOnBatch: Ember.on('didInsertElement', function() {
    this.get('changeBatchList');
    return this.addObserver("changeBatchList", this, function() {
      if (this.get('selectAll')) {
        return;
      }
      if (this.get('changeBatchList')) {
        return this.set('checked', true);
      } else {
        return this.set('checked', false);
      }
    });
  })
});

batchCheckbox.reopenClass({
  isComponentFactory: true
});

export default batchCheckbox;
