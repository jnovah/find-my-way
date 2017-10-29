FactoryBot.define do
  sequence :google_place_id do |n|
    Faker::Lorem.characters(11) + n.to_s
  end

  sequence :address do |n|
    n.to_s + Faker::Address.street_address
  end

  factory :place do
    name Faker::Address.city
  end

  trait :start do
    type "start"
  end

  trait :end do
    type "end"
  end

  trait :stop do
    type "stop"
  end

  before(:create) do |place|
    # place.trip << create(:trip)
  end
end
