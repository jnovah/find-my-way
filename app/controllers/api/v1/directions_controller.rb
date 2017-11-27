class Api::V1::DirectionsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def create
    @trip = Trip.find(params[:trip_id])
    @waypoints = create_waypoints(@trip)
    @routes = get_routes
    handle_routes
    binding.pry
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
      @trip.start.address, @trip.end.address,
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
      binding.pry
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
      binding.pry
      if create_leg.valid?
        create_leg.save
      end
    end
  end

  def origin_id(index, waypoint_order)
    if index == 0
      return @trip.start.id
    elsif index == @waypoints[:order_index].length && waypoint_order.length > 0
      return @waypoints[:order_index][waypoint_order.last]
    else
      return @waypoints[:order_index][waypoint_order[index-1]]
    end
  end

  def destination_id(index, waypoint_order)
    if waypoint_order.length == 0 || index == waypoint_order.length
      return @trip.end.id
    else
      return @waypoints[:order_index][waypoint_order[index]]
    end
  end
end
