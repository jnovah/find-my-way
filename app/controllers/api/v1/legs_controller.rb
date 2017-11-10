class Api::V1::LegsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def create
    legs = leg_params[:legs]
    trip = Trip.find(leg_params[:legs][0][:trip_id])
    if trip.legs.length == 0
      legs.each do |leg|
        object = Leg.new(leg)
        object.save
      end
    end
  end

  def update
    finished_leg = Leg.find(params[:id])
    finished_leg.update(current: false, complete: true)

    next_leg = Leg.find_by(trip_id: params[:trip_id], order: finished_leg.order + 1)
    if next_leg != nil
      next_leg.update(current: true)
      routes = build_routes
      render json: { routes: routes }
    else
      routes = build_routes
      render json: { routes: routes, trip_complete: true }
    end

  end


  private

  def build_routes
    routes = []
    Trip.find(params[:trip_id]).legs.each do |leg|
      routes << {leg: leg, origin: leg.origin, destination: leg.destination}
    end
    return routes
  end

  def update_params
    params.require(:leg).permit(:id, :trip_id)
  end

  def leg_params
    params.permit(legs: [:trip_id, :origin_id, :destination_id, :current, :order])
  end
end
