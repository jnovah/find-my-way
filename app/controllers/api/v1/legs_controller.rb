class Api::V1::LegsController < ApplicationController
  before_action :authenticate

  protect_from_forgery unless: -> { request.format.json? }

  def create
    legs = leg_params[:legs]
     legs.each do |leg|
       object = Leg.new(leg)
       object.save
     end
  end

  private

  def leg_params
    params.permit(legs: [:trip_id, :origin_id, :destination_id, :current, :order])
  end
end
