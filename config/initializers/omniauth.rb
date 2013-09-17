Rails.application.config.middleware.use OmniAuth::Builder do
  require 'omniauth-facebook'

  #provider :facebook, '648492791862773', 'a9efe5c308bc11d1058432d9b7313d91', :scope => 'xmpp_login,	user_friends', :client_options => {:ssl => {:ca_file => "/etc/ssl/certs"}}
  provider :facebook, '648492791862773', 'a9efe5c308bc11d1058432d9b7313d91', :client_options => {:ssl => {:ca_file => "/etc/ssl/certs"}}
  #provider :facebook, '648492791862773', 'a9efe5c308bc11d1058432d9b7313d91', :client_options => {:ssl => {:ca_file => '/etc/pki/tls/certs/ca-bundle.crt'}}
  #provider :facebook, '648492791862773', 'a9efe5c308bc11d1058432d9b7313d91', :client_options => {:ssl => {:ca_file => Rails.root.join('gd_bundle.crt').to_s}}

  if Rails.env.development?
    OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
  end



end


