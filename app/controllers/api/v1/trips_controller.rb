class Api::V1::TripsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def index

  end

  def show
    render json: Trip.find(params[:id])
  end

  def new

  end

  def create
    trip = Trip.new(trip_params)
    if trip.save
      render json: trip
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:user_id, :title, :description, :status)
  end
end
