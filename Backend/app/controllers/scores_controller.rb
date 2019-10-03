class ScoresController < ApplicationController
  
  def top
    scores = Score.all.sort_by{|score| score.score }
    render json: scores.as_json(include: :user)
  end

  def new
    user = User.find_by(name: params[:username])
    score = Score.new(user_id: user.id, score: params[:score])
    # debugger
    score.save
  end
end
