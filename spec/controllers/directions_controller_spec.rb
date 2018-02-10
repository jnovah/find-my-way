require 'rails_helper'

RSpec.describe Api::V1::DirectionsController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  let(:trip) { FactoryBot.create(:trip_with_places, :planning, user_id: user.id) }
  before(:each) do
    @controller = Api::V1::DirectionsController.new
    @controller.instance_variable_set(:@trip, trip)
    @controller.instance_variable_set(:@waypoints, {
      :waypoints => [trip.stops[0].address, trip.stops[1].address, trip.stops[2].address, trip.stops[3].address],
      :order_index => { 0 => trip.stops[0].id, 1 => trip.stops[1].id, 2 => trip.stops[2].id, 3 => trip.stops[3].id }
      })
  end


  describe 'directions#origin_id' do
    it 'should assign the origin location as the origin for index 0' do
      waypoint_order = [2,1,0,3]
      expect(@controller.instance_eval{ origin_id(0, waypoint_order) }).to eq(trip.origin.id)
    end

    it 'should assign the origin_id based on the waypoint_order array' do
      waypoint_order = [2,1,0,3]
      expect(@controller.instance_eval{ origin_id(1, waypoint_order) }).to eq(trip.stops[2].id)
      expect(@controller.instance_eval{ origin_id(2, waypoint_order) }).to eq(trip.stops[1].id)
      expect(@controller.instance_eval{ origin_id(3, waypoint_order) }).to eq(trip.stops[0].id)
      expect(@controller.instance_eval{ origin_id(4, waypoint_order) }).to eq(trip.stops[3].id)
    end
  end

  describe 'directions#destination_id' do
    it 'should assign the destination_id based on the waypoint_order array' do
      waypoint_order = [2,1,0,3]
      expect(@controller.instance_eval{ destination_id(0, waypoint_order) }).to eq(trip.stops[2].id)
      expect(@controller.instance_eval{ destination_id(1, waypoint_order) }).to eq(trip.stops[1].id)
      expect(@controller.instance_eval{ destination_id(2, waypoint_order) }).to eq(trip.stops[0].id)
      expect(@controller.instance_eval{ destination_id(3, waypoint_order) }).to eq(trip.stops[3].id)
    end

    it 'should assign the trip.end.id for the final index argument' do
      waypoint_order = [2,1,0,3]
      expect(@controller.instance_eval{ destination_id(4 , waypoint_order) }).to eq(trip.final.id)
    end
  end
end
