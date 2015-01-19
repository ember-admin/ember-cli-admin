import Ember from 'ember';
var navigationMenu;

navigationMenu = Ember.Component.extend({
  tagName: "li",
  classNameBindings: ["isActive:active"],
  isActive: (function() {
    if (this.get('content.route') === this.get('origContext.activeMenu')) {
      return true;
    }
    return this._hasChild();
  }).property('content', 'content.children', 'origContext.activeMenu'),
  url: (function() {
    return "/#%@".fmt(this.get('content.route'));
  }).property('content.route'),
  _hasChild: function() {
    var hasChild;
    if (!this.get('content.children')) {
      return false;
    }
    hasChild = false;
    this.get('content.children').forEach((function(_this) {
      return function(item) {
        if (item.route === _this.get('origContext.activeMenu')) {
          return hasChild = true;
        }
      };
    })(this));
    return hasChild;
  }
});

export default navigationMenu;
