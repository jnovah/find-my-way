class Leg < ApplicationRecord
  belongs_to :origin, class_name: "Place", primary_key: :id
  belongs_to :destination, class_name: "Place", primary_key: :id
  belongs_to :trip

  validates_presence_of :order
end
