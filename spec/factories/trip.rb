FactoryBot.define do
  factory :trip do
    title Faker::Lorem.words(4)
    description Faker::Lorem.sentence

    factory :trip_with_places do
      after(:create) do |trip|
        create(:start, trip: trip)
        create(:end, trip: trip)
        create(:stop, trip: trip)
        create(:stop, trip: trip)
        create(:stop, trip: trip)
        create(:stop, trip: trip)
      end
    end
  end

  factory :start do
    address Faker::Address.street_address
  end

  factory :end do
    address Faker::Address.street_address
  end

  factory :stop do
    address Faker::Address.street_address
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
end
