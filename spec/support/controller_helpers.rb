module ControllerHelpers

  def sign_in(user = User.find_or_create_from_auth_hash(OmniAuth.config.mock_auth[:google]))
    session[:user_id] = user.id
    allow(controller).to receive(:current_user).and_return(user)
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
