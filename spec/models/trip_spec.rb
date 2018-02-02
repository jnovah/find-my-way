require 'rails_helper'

RSpec.describe Trip do

  let(:user) { FactoryBot.create(:user) }
  let(:trip) { FactoryBot.create(:trip_with_places, :planning, user_id: user.id) }
  let(:completed_trip) { FactoryBot.create(:trip_with_places, :completed, user_id: user.id) }
  let(:en_route_trip) { FactoryBot.create(:trip_with_places, :en_route, user_id: user.id) }

  describe "the build of the Trip object" do
    it "should create a trip with a title and description" do
      expect(trip).to be_a(Trip)
      expect(Trip.find(trip.id)).to eq(trip)
      expect(Trip.find(trip.id).title).to eq(trip.title)
      expect(Trip.find(trip.id).description).to eq(trip.description)
      expect(Trip.find(trip.id).user.uid).to eq(user.uid)
    end

    it "should have a starting location" do
      expect(trip.places).to include(trip.origin)
      expect(trip.places).to include(trip.end)
      expect(trip.places).to include(trip.stops[0])
      expect(trip.places).to include(trip.stops[1])
      expect(trip.places).to include(trip.stops[2])
      expect(trip.places).to include(trip.stops[3])
    end

    it "should create a starting location that is a child of Place" do
      expect(trip.origin).to be_a(Place)
    end

    it "should have an ending location that are a child of Place" do
      expect(trip.end).to be_a(Place)
    end

    it "should have four stops that are children of Place" do
      expect(trip.stops.length).to eq(4)
      expect(trip.stops[0]).to be_a(Place)
      expect(trip.stops[1]).to be_a(Place)
      expect(trip.stops[2]).to be_a(Place)
      expect(trip.stops[3]).to be_a(Place)
    end
  end

  describe "set_en_route" do
    it "should change en_route to true and planning to false" do
      trip.set_en_route

      expect(trip.en_route).to be(true)
      expect(trip.planning).to be(false)
    end

    it "should not update a completed trips" do
      completed_trip.set_en_route
      expect(completed_trip.completed).to be(true)
      expect(completed_trip.en_route).to be(false)
      expect(completed_trip.planning).to be(false)
      expect(completed_trip.errors.full_messages[0]).to eq("Completed trip cannot be set to en route")
    end
  end

  describe "set_completed" do
    it "should change an en_route trip to a completed trip" do
      en_route_trip.set_completed
      expect(en_route_trip.en_route).to be(false)
      expect(en_route_trip.completed).to be(true)
      expect(en_route_trip.planning).to be(false)
    end

    it "should not update trips in planning" do
      trip.set_completed
      expect(trip.completed).to be(false)
      expect(trip.en_route).to be(false)
      expect(trip.planning).to be(true)
      expect(trip.errors.full_messages[0]).to eq("Planning -- Trips in planning cannot be updated to completed")
    end
  end
end
