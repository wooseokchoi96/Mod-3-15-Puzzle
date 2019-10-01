class ScoresController < ApplicationController
  
  def top_5_scores
    scores = Score.all.sort_by{|score| score}
    render json: scores[0...5]
  end

end
