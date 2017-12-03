require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "google_maps_service"
# require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

Dotenv::Railtie.load

HOSTNAME = ENV['HOSTNAME']

module FindMyWay
  class Application < Rails::Application
    config.load_defaults 5.1

    # Don't generate system test files.
    config.generators.system_tests = nil
  end
end
