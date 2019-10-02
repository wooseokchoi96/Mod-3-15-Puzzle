class UsersController < ApplicationController
    
    def my_top
        user = User.find_by(name: params[:name])
        scores = user.scores.sort_by(|score| score)
        render json: scores
    end

end