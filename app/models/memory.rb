class Memory < ApplicationRecord
  belongs_to :place
  validates_presence_of :text_body
  validates_presence_of :type, inclusion: { in: ["photo", "journal"] }
end

class Photo < Memory
end

class Journal < Memory
end
