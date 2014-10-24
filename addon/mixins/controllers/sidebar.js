import Ember from 'ember';

var sidebarMixin;
sidebarMixin = Ember.Mixin.create({
  isShowSidebar: true,
  sidebarTitle: 'Sidebar',
  sidebarContent: '<p>Some Content</p>'
});

export default sidebarMixin;