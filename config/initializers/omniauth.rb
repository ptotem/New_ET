Rails.application.config.middleware.use OmniAuth::Builder do
  require 'omniauth-facebook'


  #Development
  provider :facebook, '648492791862773', 'a9efe5c308bc11d1058432d9b7313d91', :client_options => {:ssl => {:ca_file => "/etc/ssl/certs"}}
  #Production
  #provider :facebook, '1418815755005345', '37765843b5c486ae854c0a8adc91be11', :client_options => {:ssl => {:ca_file => "/etc/ssl/certs"}}

  if Rails.env.development?
    OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
  end



end


