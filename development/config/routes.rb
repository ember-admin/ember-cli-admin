EmberRailsAdmin::Application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'admin/dashboard#index'

  namespace :admin do
    match "/dashboard" => "dashboard#index", via: :get
    resources :users
    resources :addresses
    resources :cars
  end


end
