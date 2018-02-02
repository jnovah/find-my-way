class Api::V1::PlacesController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def start_create
    origin = Origin.new(places_params)
    if origin.save
      render json: {location: origin, type: origin.type}
    end
  end

  def final_create
    final = Final.new(places_params)
    if final.save
      render json: {location: final, type: final.type}
    end
  end

  def stop_create
    stop = Stop.new(places_params)
    if stop.save
      render json: {location: stop, type: stop.type}
    end
  end

  private

  def places_params
    params.require(:place).permit(:address, :trip_id, :name)
  end
end
