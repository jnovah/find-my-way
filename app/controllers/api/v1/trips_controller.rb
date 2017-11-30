class Api::V1::TripsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def index
    trips = Trip.where(user_id: current_user.id)
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

  def complete
    trip = Trip.find(params[:id])
    trip.update(status: "completed")
    render json: {status: "complete"}
  end

  def create
    trip = Trip.new(trip_params.merge(user_id: current_user.id))
    if trip.save
      render json: trip
    end
  end

  def check_en_route
    if trip = Trip.find_by(en_route: true, user_id: current_user.id)
      render json: { en_route: true }
    else
      render json: { en_route: false }
    end
  end

  def get_en_route
    trip = Trip.find_by(en_route: true, user_id: current_user.id)
    legs = trip.legs
    routes = []
    count = 0
    legs.order(:order).each do |leg|
      routes << { leg: leg, origin: leg.origin, destination: leg.destination }
      if leg["complete"]
        count += 1
      end
    end
    if count < routes.length
      render json: { trip: trip, routes: routes, trip_complete: false }
    elsif count == routes.length
      render json: { trip: trip, routes: routes, trip_complete: true }
    end
  end

  def en_route
    user = current_user
    trip = Trip.find(params[:id])
    if user.trips.en_route.length == 0
      trip.update(status: 'en route')
      render json: { trip: trip, start: trip.start, end: trip.end, stops: trip.stops }
    else
      render json: { error: "You can only be on one trip at a time" }
    end
  end

  private


  def trip_params
    params.require(:trip).permit(:title, :description, :status)
  end
end
