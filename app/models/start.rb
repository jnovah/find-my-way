class Start < Place
  validates :type, presence: true, inclusion: { in: ["start"] }
  validates :trip_id, uniqueness: { scope: :type }
end
