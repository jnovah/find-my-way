class Place < ApplicationRecord
  belongs_to :trip
  has_many :memories

  validates_presence_of :google_place_id
  validates :type, presence: true, inclusion: { in: ["start", "stop", "end"] }
  validates_presence_of :place_id
end

class Start < Place
end

class End < Place
end

class Stop < Place
end
