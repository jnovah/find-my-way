class StopSerializer < ActiveModel::Serializer
  attributes :id, :address, :lat, :long
end
