class Api::V1::UsersController < ApplicationController
  def index
    if current_user
      render json: current_user
    else
      user = {}
      render json: user
    end
  end
end
