import Ember from 'ember';
var buttonView;

buttonView = Ember.View.extend({
  tagName: "button",
  classNames: ["btn btn-default"],
  action: '',
  click: function() {
    return this.get('controller').send(this.get('action'), this.get('context'));
  }
});

export default buttonView;