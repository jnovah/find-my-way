class Api::V1::TripsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def index
    user = current_user
    trips = []
    user.trips.each do |trip|
      if trip.start && trip.end
        trips.push(trip)
      end
    end
    render json: trips
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
