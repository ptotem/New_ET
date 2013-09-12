class ApiController < ActionController::Metal
  include ActionController::Helpers
  include ActionController::Redirecting
  include ActionController::Rendering
  include ActionController::Renderers::All
  include ActionController::ConditionalGet
  include ActionController::MimeResponds
  include ActionController::RequestForgeryProtection
  include ActionController::ForceSSL
  include AbstractController::Callbacks
  include ActionController::ParamsWrapper
  include ActionController::Instrumentation
  include Rails.application.routes.url_helpers
  append_view_path "#{Rails.root}/app/views"
  wrap_parameters :format => [:json]
  protect_from_forgery
end