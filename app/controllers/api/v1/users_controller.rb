class Api::V1::UsersController < ApplicationController
  before_action :authenticate
  def index
    if current_user
      render json: current_user
    else
      user = {}
      render json: user
    end
  end

  def user_id
    user = current_user
    render json: user.id
  end
end
