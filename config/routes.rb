Rails.application.routes.draw do

  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/home')
  get 'home', to: 'home#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_files#index"

  namespace :api do
    namespace :v1 do
      get 'users/user_profile'
      resources :users, only: [:index, :new]

      get '/trips/check_en_route'
      get '/trips/get_en_route'
      patch '/trips/en_route/:id', to: 'trips#en_route#update'
      patch '/trips/complete/:id', to: 'trips#complete#update'
      resources :trips
      resources :trips, only: [:show] do
        resources :legs, only: [:create, :update]
        resources :directions, only: [:create]
      end

      post '/places/start_create'
      post '/places/final_create'
      post '/places/stop_create'
      resources :places, only: [:show, :update, :destroy]
    end
  end

  get '*path', to: 'static_files#index'

end
