class Origin < Place
  validates :trip_id, uniqueness: { scope: :type }

  def start_create

  end
end
