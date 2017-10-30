class Trip < ApplicationRecord
  belongs_to :user
  has_one :start
  has_one :end
  has_many :stops
  has_many :places

  validates_presence_of :user
  validates_presence_of :title
  validates :status, presence: true, inclusion: { in: ["planning", "en route", "completed"] }
end
