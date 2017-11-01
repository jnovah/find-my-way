FactoryBot.define do

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
end

FactoryBot.define do
  factory :start do
    name Faker::Address.city
    type "start"
  end
end

FactoryBot.define do
  factory :end do
    name Faker::Address.city
    type "end"
  end
end

FactoryBot.define do
  factory :stop do
    name Faker::Address.city
    type "stop"
  end
end
