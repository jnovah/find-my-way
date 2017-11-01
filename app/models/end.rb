class End < Place
  validates :trip_id, uniqueness: { scope: :type }

  def final_create

  end
end
