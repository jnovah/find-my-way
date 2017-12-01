require 'rails_helper'

RSpec.describe Api::V1::TripsController, type: :controller do
  let(:current_user) { FactoryBot.create(:user) }
  let(:other_user) { FactoryBot.create(:user) }
  let(:trip) { FactoryBot.create(:trip_with_places, :planning, user_id: current_user.id) }
  let(:completed_trip) { FactoryBot.create(:trip_with_places, :completed, user_id: current_user.id) }
  let(:en_route_trip) { FactoryBot.create(:trip_with_places, :en_route, user_id: current_user.id) }
  let(:other_user_trip) { FactoryBot.create(:trip_with_places, :en_route, user_id: other_user.id) }

  describe "index" do
    it "should not complete request when not logged in" do
        get :index
        expect(response).to have_http_status(:found)
    end
  end
end
