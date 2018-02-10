class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :picture

  private

  def name
    object.full_name
  end
end
