class User < ApplicationRecord

    has_many :scores

    def my_top
        s = self.scores.sort_by{|user_score| user_score.score } 
        return s.map{|c|c.score}
    end

end
