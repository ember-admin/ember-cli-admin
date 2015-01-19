import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';
var batchActionView;

batchActionView = Ember.View.extend(ConfirmationMixin, {
  tagName: "li",
  click: function(event) {
    event.preventDefault();
    if (this.get('controller.__batches.length') < 1) {
      return;
    }
    if (this.get('context.confirm')) {
      return this._showConfirmation({
        batch: true
      });
    } else {
      return this._batchAction();
    }
  },
  _batchAction: function() {
    return this.get('controller').send("baseBatchAction", this.get('context.action'));
  }
});

export default batchActionView;
