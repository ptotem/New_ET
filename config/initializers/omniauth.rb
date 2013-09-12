Rails.application.config.middleware.use OmniAuth::Builder do
  require 'omniauth-facebook'

  provider :facebook, '648492791862773', 'a9efe5c308bc11d1058432d9b7313d91',{:client_options => {:ssl => {:ca_path => "/etc/ssl/certs/"}}}

end


