FactoryBot.define do
  factory :trip do
    title Faker::Lorem.words(4)
    description Faker::Lorem.sentence

    factory :trip_with_places do
      after(:create) do |trip|
        create(:origin, trip: trip)
        create(:final, trip: trip)
        create(:stop, trip: trip)
        create(:stop, trip: trip)
        create(:stop, trip: trip)
        create(:stop, trip: trip)
      end
    end
  end

  factory :origin do
    address Faker::Address.street_address
  end

  factory :final do
    address Faker::Address.street_address
  end

  factory :stop do
    address Faker::Address.street_address
  end

  trait :planning do
    planning true
  end

  trait :en_route do
    en_route true
    planning false
    completed false
  end

  trait :completed do
    completed true
    planning false
    en_route false
  end
end
