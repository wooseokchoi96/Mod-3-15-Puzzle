class UsersController < ApplicationController
    
    def login 
        user = User.find_or_create_by(name: params[:name])
        # scores1 = Score.all.select{|s| s.user_id == user.id}
        # scores2 = scores1.sort
        render json: user.as_json(include: :scores)
        # render json: scores
    end

end