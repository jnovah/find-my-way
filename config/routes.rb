Rails.application.routes.draw do

  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/home')
  get 'home', to: 'home#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_files#index'

  namespace :api do
    namespace :v1 do
      get 'users/user_id'
      resources :users, only: [:index, :new]

      patch '/trips/en_route/:id', to: 'trips#en_route#update'
      get '/trips/get_en_route'
      resources :trips

      post '/places/start_create'
      post '/places/final_create'
      post '/places/stop_create'
      resources :places, only: [:show, :update, :destroy]
    end
  end

  get '*path', to: 'static_files#index'
end
