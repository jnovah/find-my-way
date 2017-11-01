class End < Place
  validates :type, presence: true, inclusion: { in: ["end"] }
  validates :trip_id, uniqueness: { scope: :type }

  def create

  end
end
