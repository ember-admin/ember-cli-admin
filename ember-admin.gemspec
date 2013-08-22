# coding: utf-8
$:.push File.expand_path("../lib", __FILE__)
require 'ember-admin/version'

Gem::Specification.new do |spec|
  spec.name          = "ember-admin"
  spec.version       = EmberAdmin::VERSION
  spec.authors       = ["roundscope"]
  spec.email         = ["hi@roundscope.com"]
  spec.description   = %q{Ember Admin}
  spec.summary       = %q{Ember Admin}
  spec.homepage      = "http://roundscope.com"

  spec.files         = Dir["app/assets/**/*", "lib/**/*", "Gemfile", "ember-admin.gemspec"]

  spec.add_dependency "bundler", "~> 1.3"
  spec.add_dependency "rake"
  spec.add_dependency "ember-rails"
  spec.add_dependency 'emblem-rails'
  spec.add_dependency 'handlebars-source', ">= 1.0.0.rc4"
  spec.add_dependency "ember-source", ">= 1.0.0.rc.6.1"
end
