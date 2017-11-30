class TripSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :start, :end, :planning, :en_route, :completed

end
