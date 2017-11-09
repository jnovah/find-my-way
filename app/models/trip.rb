class Trip < ApplicationRecord
  belongs_to :user
  has_one :start
  has_one :end
  has_many :stops
  has_many :places, dependent: :destroy
  has_many :legs, dependent: :destroy

  validates_presence_of :user
  validates_presence_of :title
  validates :status, presence: true, inclusion: { in: ["planning", "en route", "completed"] }

  def self.en_route
    where(status: 'en route')
  end

end
