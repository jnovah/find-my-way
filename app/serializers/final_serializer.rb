class FinalSerializer < ActiveModel::Serializer
  attributes :id, :address, :coordinates, :google_place_id
end
