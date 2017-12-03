require 'rails_helper'
require 'json'

RSpec.describe Api::V1::TripsController, type: :controller do
  let(:other_user) { FactoryBot.create(:user) }
  let(:trip) { FactoryBot.create(:trip_with_places, :planning, user_id: current_user.id) }
  let(:completed_trip) { FactoryBot.create(:trip_with_places, :completed, user_id: current_user.id) }
  let(:en_route_trip) { FactoryBot.create(:trip_with_places, :en_route, user_id: current_user.id) }
  let(:planning_trip) { FactoryBot.create(:trip_with_places, :planning, user_id: current_user.id) }
  let(:other_user_trip) { FactoryBot.create(:trip_with_places, :en_route, user_id: other_user.id) }

  describe "index" do
    it "should not complete request when not logged in" do
        get :index
        expect(response).to have_http_status(:found)
    end

    it "should provide a list of trips created by the logged in user" do
      sign_in
      current_user.trips << [completed_trip, en_route_trip, planning_trip]
      get :index
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['trips'].length).to eq(3)
      expect(body['trips'][0]['id'] == completed_trip.id).to be(true)
      expect(body['trips'][1]['id'] == en_route_trip.id).to be(true)
      expect(body['trips'][2]['id'] == planning_trip.id).to be(true)
    end
  end
end
