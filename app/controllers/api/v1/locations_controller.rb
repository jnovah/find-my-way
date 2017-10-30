require "net/http"

class Api::V1::LocationsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def create_trip
    trip = Trip.new(trip_params)
    binding.pry
    if trip.save
      binding.pry
      render json: trip
    end
  end

  def trip_show
    render json: Trip.find(params[:id])
  end

  def create_start
    google = get_google_place

    start = Start.new()
  end

  private

  def get_google_place
    input = location_params.gsub(' ', '+')
    request_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + input + "&key=" + ENV("distance_api_key")
    request_uri = URI(request_url)
    response = Net::HTTP.get(request_uri)
    body = JSON.parse(response)
    return body.results.place_id
  end

  def trip_params
    params.require(:location).permit(:user_id, :title, :description, :status)
  end

  def location_params
    params.require(:location).permit(:address)
  end
end
