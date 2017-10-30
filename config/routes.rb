Rails.application.routes.draw do

  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/home')
  get 'home', to: 'home#show'
  get 'me', to: 'me#show', as: 'me'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_files#index'

  namespace :api do
    namespace :v1 do
      get 'users/user_id'
      resources :users, only: [:index]
      post '/locations/create_trip', to: 'locations#create_trip'
      get '/locations/trip/:id', to: 'locations#trip_show'
      post '/locations/create_start'
      post '/locations/create_end'
      post '/locations/create_stop'
      resources :locations, only: [:index]
    end
  end

  get '*path', to: 'static_files#index'
end
