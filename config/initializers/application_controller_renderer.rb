# Be sure to restart your server when you modify this file.

# ActiveSupport::Reloader.to_prepare do
#   ApplicationController.renderer.defaults.merge!(
#     http_host: 'example.org',
#     https: false
#   )
# end

GoogleMapsService.configure do |config|
  config.key = 'AIzaSyBxgCBGkaioyQNgXAPVEiBfnz9IFeVfXws'
  config.retry_timeout = 20
  config.queries_per_second = 10
end
