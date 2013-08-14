# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ember/admin/version'
require "rake"

Gem::Specification.new do |spec|
  spec.name          = "ember-admin"
  spec.version       = Ember::Admin::VERSION
  spec.authors       = ["roundscope"]
  spec.email         = ["hi@roundscope.com"]
  spec.description   = %q{Ember Admin}
  spec.summary       = %q{Ember Admin}
  spec.homepage      = "http://roundscope.com"

  spec.files         = `git ls-files app/assets/javascripts/admin`.split("\n")
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "ember-rails"
  spec.add_development_dependency 'emblem-rails'
  spec.add_development_dependency 'handlebars-source', ">= 1.0.0.rc4"
  spec.add_development_dependency "ember-source", "~> 1.0.0.rc.6.1"
  spec.add_development_dependency 'twitter-bootstrap-rails'
end
