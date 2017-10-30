class Place < ApplicationRecord
  belongs_to :trip
  has_many :memories

  validates_presence_of :google_place_id
  validates :type, presence: true, inclusion: { in: ["start", "stop", "end"] }
  validates_presence_of :google_place_id
end

class Start < Place
  validates :type, presence: true, inclusion: { in: ["start"] }
  validates :trip_id, uniqueness: { scope: :type }
end

class End < Place
  validates :type, presence: true, inclusion: { in: ["end"] }
  validates :trip_id, uniqueness: { scope: :type }
end

class Stop < Place
  validates :type, presence: true, inclusion: { in: ["stop"] }
end
