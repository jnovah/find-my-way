require 'rails_helper'

RSpec.describe User do
  describe "User" do
    it "creates a user with a first name, last name, uid and email" do
      user1 = FactoryBot.create(:user)

    end
  end
end
