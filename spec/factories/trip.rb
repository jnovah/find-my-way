FactoryBot.define do
  factory :trip do
    title Faker::Lorem.words(4)
    description Faker::Lorem.sentence
  end

  trait :planning do
    status "planning"
  end

  trait :en_route do
    status "en route"
  end

  trait :completed do
    staus "completed"
  end

  before(:create) do |trip|
    # trip.user << create(:user)
  end
end
