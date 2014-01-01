window.Admin = Ember.Application.extend({
  name: "admin",

  Resolver: window.AdminResolver,
  Router: Ember.Router.extend(),

  ready:  ->

});