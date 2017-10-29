class Trip < ApplicationRecord
  belongs_to :user
  has_one :start
  has_one :end
  has_many :stops

  validates_presence_of :user
  validates_presence_of :title
end
