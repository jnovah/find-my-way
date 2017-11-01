class Api::V1::PlacesController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def create_start
    start = Start.new(places_params)
    if start.save
      render json: start
    end
  end

  def create_end
    final = End.new(places_params)
    if final.save
      render json: final
    end
  end

  def create_stop
    stop = Stop.new(places_params)
    if stop.save
      render json: stop
    end
  end

  private

  def places_params
    params.require(:place).permit(:address, :lat, :long, :trip_id)
  end
end
