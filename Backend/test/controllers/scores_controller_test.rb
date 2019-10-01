require 'test_helper'

class ScoresControllerTest < ActionDispatch::IntegrationTest
  test "should get user_id" do
    get scores_user_id_url
    assert_response :success
  end

  test "should get score" do
    get scores_score_url
    assert_response :success
  end

end
