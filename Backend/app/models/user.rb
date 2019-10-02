class User < ApplicationRecord

    has_many :scores

    def my_top
        return self.scores.sort_by{|user_score| user_score.score } 
    end

end
