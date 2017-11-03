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
    trip = Trip.find(params[:id])
    if trip.user == current_user
      render json: { trip: trip, destinations: { start: trip.start, end: trip.end, stops: trip.stops } }
    else
      render json: { error: "You do not have access to this trip" }
    end
  end

  def new

  end

  def create
    trip = Trip.new(trip_params.merge(user_id: current_user.id))
    if trip.save
      render json: trip
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:title, :description, :status)
  end
end
