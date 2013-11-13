#= require ./resolver
#= require_self
#= require ./namespace

#= require_tree ./dsl
#= require ./initializer

#= require_tree ./helpers
#= require_tree ./views
#= require_tree ./templates

#= require ./router
#= require_tree ./routes
#= require_tree ./controllers

#=require_tree ./logics

#= require ./form_config

#= require_tree ./adapters

#@Admin = Ember.Application.create(
#  Resolver: Admin.Resolver.extend()
#)
#Admin.ApplicationAdapter = DS.ActiveModelAdapter.extend()

@Admin = Ember.Namespace.create()