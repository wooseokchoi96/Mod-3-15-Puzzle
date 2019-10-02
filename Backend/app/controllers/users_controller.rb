class UsersController < ApplicationController
    
    def login 
        user = User.find_or_create_by(name: params[:name])
        render json: user.as_json(include: :scores)
    end

end