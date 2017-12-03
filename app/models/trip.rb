class Trip < ApplicationRecord
  belongs_to :user
  has_one :start
  has_one :end
  has_many :stops
  has_many :places, dependent: :destroy
  has_many :legs, dependent: :destroy

  validates_presence_of :user
  validates_presence_of :title

  def self.en_route
    where(en_route: true)
  end

  def has_legs?
    if self.legs.length > 0
      return true
    else
      return false
    end
  end

  def set_en_route
    if !self.completed
      self.update(en_route: true, planning: false)
    else
      self.errors.add(:completed, :invalid, message: "trip cannot be set to en route")
    end
  end

  def set_completed
    if self.en_route
      self.update(completed: true, en_route: false)
    else
      self.errors.add(:planning, :invalid, message: "-- Trips in planning cannot be updated to completed")
    end
  end
end
