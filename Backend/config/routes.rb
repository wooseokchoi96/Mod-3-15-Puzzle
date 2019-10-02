Rails.application.routes.draw do
  # get 'scores/user_id'
  # get 'scores/score'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/scores/top', to: 'scores#top'
  post '/users/login', to: 'users#login'
end
