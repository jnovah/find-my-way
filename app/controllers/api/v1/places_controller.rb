class Api::V1::PlacesController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def origin_create
    origin = Origin.new(places_params.merge(coordinates_params))
    if origin.save
      render json: origin
    end
  end

  def final_create
    final = Final.new(places_params.merge(coordinates_params))
    if final.save
      render json: {location: final, type: final.type}
    end
  end

  def stop_create
    stop = Stop.new(places_params.merge(coordinates_params))
    if stop.save
      render json: {location: stop, type: stop.type}
    end
  end

  private

  def places_params
    params.require(:place).permit(:address, :trip_id, :google_place_id)
  end

  def coordinates_params
    params.permit(coordinates: [:lat, :lng])
  end
end
