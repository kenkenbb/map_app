Rails.application.routes.draw do
  get 'about', to: 'home#about'
  get 'login', to: "users#login"
  get 'mypage', to: 'users#me'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#top"
  resources :users, only: %i[new create]
end
