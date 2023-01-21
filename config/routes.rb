Rails.application.routes.draw do
  resources :posts do
    resources :comments
  end
  resources :users, except: [:index]
  post '/login', to: 'authentication#login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end
