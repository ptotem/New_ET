ActionMailer::Base.smtp_settings = {
    :address              => "smtp.timesgroup.in",
    :port                 => 25,
    :domain               => "timesgroup.in",
    :user_name            => "winwithet@timesgroup.in",
    :password             => "times@123",
    :authentication       => "plain",
    :enable_starttls_auto => true
}
