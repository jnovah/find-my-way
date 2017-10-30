require "net/http"

class Api::V1::LocationsController < ApplicationController
  before_action :authenticate
  def index

  end

  def show

  end

  def create
    input = location_params.gsub(' ', '+')
    request_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + input + "&key=" + ENV("distance_api_key")
    request_uri = URI(request_url)
    response = Net::HTTP.get(request_uri)
    body = JSON.parse(response)
  end

  private

  def location_params
    params.require(:location).permit(:address)
  end
end
