class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :bounds, :planning, :en_route, :completed, :has_legs

  has_one :start, key: :start
  has_one :end, key: :end
  has_many :stops, key: :stops

  has_many :legs, key: :legs

  def has_legs?
    object.has_legs
  end
end
