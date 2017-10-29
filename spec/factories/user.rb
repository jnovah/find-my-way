FactoryBot.define do
  factory :user do
    provider Faker::Internet.domain_word
    uid Faker::Number.number(10)
    email Faker::Internet.free_email
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
