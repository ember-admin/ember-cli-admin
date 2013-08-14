#= require ./resolver
#= require_self
#= require ./namespace
#= require_tree ./dsl
#= require ./initializer

#q= require_tree ./helpers
#= require_tree ./views
#= require_tree ./templates

#= require ./store
#qq= require_tree ./models

#= require ././meta_route
#= require ./router
#= require_tree ./routes
#= require_tree ./controllers

#=require_tree ./logics

#= require ./form_config

@Admin = Ember.Application.create(
  resolver: Admin.Resolver.extend()
)