import Ember from 'ember';

export default Ember.Checkbox.extend({
  isChecked: Ember.on('init', function() {
    var attr = this.get('attribute');
    var isChecked = Ember.tryInvoke(this.get('content'), 'isActive', [attr]);
    this.set('checked', isChecked);
  }),

  click: function(e) {
    var attr = this.get('attribute');
    Ember.tryInvoke(this.get('content'), 'isActive', [attr,
      this.get('checked')
    ]);
  }
});
