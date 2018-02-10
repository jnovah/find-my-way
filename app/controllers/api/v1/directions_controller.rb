class Api::V1::DirectionsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def create
    @trip = Trip.find(params[:trip_id])
    @waypoints = create_waypoints(@trip)
    @routes = get_routes
    handle_routes
    render json: @trip.legs
  end

  private

  def create_waypoints(trip)
    waypoints = []
    order_index = {}
    trip.stops.each_with_index do |stop, index|
      waypoints << stop.address
      order_index[index] = stop.id
    end
    return { waypoints: waypoints, order_index: order_index }
  end

  def get_routes
    gmaps = GoogleMapsService::Client.new
    routes = gmaps.directions(
      @trip.origin.address, @trip.final.address,
      waypoints: @waypoints[:waypoints],
      mode: 'driving',
      alternatives: false,
      optimize_waypoints: true
    )
  end

  def handle_routes
    @trip.update(bounds: @routes[0][:bounds])
    sort_legs
  end

  def sort_legs
    @routes[0][:legs].each_with_index do |leg, index|
      create_leg = Leg.new(
        trip_id: @trip.id,
        origin_id: origin_id(index, @routes[0][:waypoint_order]),
        destination_id: destination_id(index, @routes[0][:waypoint_order]),
        order: index + 1,
        distance: leg[:distance],
        duration: leg[:duration],
        origin_location: leg[:start_location],
        destination_location: leg[:end_location]
      )
      if create_leg.valid?
        create_leg.save
      end
    end
  end

  def origin_id(index, waypoint_order)
    if index == 0
      return @trip.origin.id
    elsif index == @waypoints[:order_index].length && waypoint_order.length > 0
      return @waypoints[:order_index][waypoint_order.last]
    else
      return @waypoints[:order_index][waypoint_order[index-1]]
    end
  end

  def destination_id(index, waypoint_order)
    if waypoint_order.length == 0 || index == waypoint_order.length
      return @trip.final.id
    else
      return @waypoints[:order_index][waypoint_order[index]]
    end
  end
end
