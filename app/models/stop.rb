class Stop < Place
  validates :type, presence: true, inclusion: { in: ["stop"] }

  def create_stop

  end
end
