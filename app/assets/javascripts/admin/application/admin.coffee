#= require_self
#= require ./dsl/navigation
#= require ./initializer

#= require_tree ./helpers
#= require_tree ./views
#= require_tree ./templates

#= require ./store
#= require_tree ./models

#= require ./router
#= require_tree ./routes
#= require_tree ./controllers

@Admin = Ember.Application.create()
@Admin.DSL = Ember.Namespace.create()
@Admin.Logics = Ember.Namespace.create()