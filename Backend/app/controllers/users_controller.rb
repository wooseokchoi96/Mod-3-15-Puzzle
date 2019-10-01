class UsersController < ApplicationController
    
    def my_top_5
        user = User.find_by(name: params[:name])
        scores = user.scores.sort_by(|score| score)
        render json: scores[0...5]
    end

end