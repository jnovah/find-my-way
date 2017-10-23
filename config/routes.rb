Rails.application.routes.draw do

  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'home', to: 'home#show'
  get 'me', to: 'me#show', as: 'me'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_files#index'

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end
end
