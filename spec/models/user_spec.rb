require 'rails_helper'

RSpec.describe User do
  describe "User" do
    it "creates a user with a first name, last name, uid and email" do
      user1 = FactoryBot.create(:user)

      expect(User.find(user1.id).first_name).to eq(user1.first_name)
      expect(User.find(user1.id).last_name).to eq(user1.last_name)
      expect(User.find(user1.id).uid).to eq(user1.uid)
      expect(User.find(user1.id).email).to eq(user1.email)
    end
  end
end
