import Ember from 'ember';
import ConfirmationMixin from 'ember-cli-admin/mixins/views/confirmation';
import layout from '../templates/components/admin-batch-action';

export default Ember.Component.extend(ConfirmationMixin, {
  layout: layout,

  tagName: "li",
  click: function(event) {
    event.preventDefault();
    if (this.get('__batches.length') < 1) {
      return;
    }
    if (this.get('action.confirm')) {
      return this._showConfirmation({
        batch: true
      });
    } else {
      return this._batchAction();
    }
  },
  _batchAction: function() {
    return this.sendAction(this.get('baseBatchAction'), this.get('action.action'));
  }
});
