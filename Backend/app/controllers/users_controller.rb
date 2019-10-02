class UsersController < ApplicationController
    
    def login 
        user = User.find_or_create_by(name: params[:name])
        sorted_scores = user.my_top
        render json: {user: user, sortedScores: sorted_scores}
    end

end