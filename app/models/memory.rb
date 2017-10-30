class Memory < ApplicationRecord
  belongs_to :place
  validates_presence_of :text_body
  validate :type, presence: true, inclusion: { in: ["photo", "journal"] }
end

class Photo < Memory
end

class Journal < Memory
end
