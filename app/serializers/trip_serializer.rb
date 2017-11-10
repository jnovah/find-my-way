class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :start, :end, :status

end
