class Start < Place
  validates :trip_id, uniqueness: { scope: :type }

  def create_start

  end
end
