#= require_self
#= require ./initializer

#= require_tree ./helpers
#= require_tree ./views
#= require_tree ./templates

#= require ./store
#= require_tree ./models

#= require ./router
#= require_tree ./routes
#= require_tree ./controllers

window.Admin = Ember.Application.create({rootElement: "body"})