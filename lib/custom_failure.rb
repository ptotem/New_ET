class CustomFailure < Devise::FailureApp
  def redirect_url
    if warden_options[:scope] == :user
      "/"
    else
      new_admin_user_session_path
    end
  end

  def respond
    if http_auth?
      http_auth
    else
      #flash[:notice] = I18n.t(:unauthenticated, :scope => [ :devise, :failure ])
      redirect
    end
  end
end