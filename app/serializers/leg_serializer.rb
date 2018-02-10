class LegSerializer < ActiveModel::Serializer
  attributes :id, :current, :complete, :order, :distance, :duration, :origin_id, :destination_id, :origin_location, :destination_location
end
