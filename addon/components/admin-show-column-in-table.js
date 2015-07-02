import Ember from 'ember';
import layout from '../templates/components/admin-show-column-in-table';

export default Ember.Checkbox.extend({
  layout: layout,

  isComponentFactory: true,
  isChecked: Ember.on('init', function() {
    var attr = this.get('attribute');
    var isChecked = Ember.tryInvoke(this.get('content'), 'isActive', [attr]);
    this.set('checked', isChecked);
  }),

  click: function() {
    var attr = this.get('attribute');
    Ember.tryInvoke(this.get('content'), 'isActive', [attr,
      this.get('checked')
    ]);
  }
});
