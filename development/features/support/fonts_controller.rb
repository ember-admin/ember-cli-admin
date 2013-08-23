class FontsController < ActionController::Base

  def self.turn_on_routing
    Rails.application.routes.disable_clear_and_finalize = true
    Rails.application.routes.draw do
      match '/fonts/glyphicons-halflings-regular.woff', to: 'fonts#do', via: [:get, :post, :put, :delete]
      match '/fonts/glyphicons-halflings-regular.ttf', to: 'fonts#do', via: [:get, :post, :put, :delete]
      match '/fonts/glyphicons-halflings-regular.svg', to: 'fonts#do', via: [:get, :post, :put, :delete]
    end
  end

  def self.teardown_routing
    # be sure to reload routes after the tests run, otherwise all your
    # other controller specs will fail
    Rails.application.reload_routes!
  end

  def do
    render text: ""
  end
end