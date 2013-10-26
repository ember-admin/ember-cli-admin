require 'cucumber/rails'

root_path = File.expand_path(File.join(File.dirname(__FILE__), '..', '..'))
$: << File.join(root_path, 'spec')
ENV["RAILS_ENV"] ||= 'test'

require File.join(root_path, 'config', 'environment')
require 'cucumber/rails'
require 'cucumber/rspec/doubles'
require 'capybara/rails'
require 'capybara/cucumber'
require 'capybara/session'
require 'capybara/poltergeist'

#require 'factory_girl'

#
Capybara.register_driver :poltergeist do |app|
  opts = {js_errors: true}
  unless RUBY_PLATFORM =~ /darwin/
    opts.merge! \
      :phantomjs => ENV['PHANTOMJS'] || '/bin/phantomjs'
  end

  Capybara::Poltergeist::Driver.new(app, opts)
end

#Capybara.javascript_driver = :webkit

Capybara.javascript_driver = :poltergeist
Capybara.default_selector = :css
Capybara.default_wait_time = 5
Capybara.ignore_hidden_elements = true

