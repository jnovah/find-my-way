require 'rails_helper'

RSpec.describe Trip do
  describe "the build of the Trip object" do
    let(:user) { FactoryBot.create(:user) }
    let(:trip1) { FactoryBot.create(:trip, :planning, user_id: user.id) }
    let(:start) { FactoryBot.create(:start, trip_id: trip1.id) }
    let(:final) { FactoryBot.create(:end, trip_id: trip1.id) }
    let(:places) { create_list(:stop, 4, trip_id: trip1.id) }

    it "should create a trip with a title and description" do
      expect(trip1).to be_a(Trip)
      expect(Trip.find(trip1.id)).to eq(trip1)
      expect(Trip.find(trip1.id).title).to eq(trip1.title)
      expect(Trip.find(trip1.id).description).to eq(trip1.description)
      expect(Trip.find(trip1.id).user.uid).to eq(user.uid)
    end

    it "should have a starting location" do
      expect(trip1.places).to include(start)
      expect(trip1.places).to include(final)
    end

    it "should create a starting location that is a child of Place" do
      expect(start).to be_a(Place)
    end

    it "should have an ending location that are a child of Place" do
      expect(final).to be_a(Place)
    end
  end
end
