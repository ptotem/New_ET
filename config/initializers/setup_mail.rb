ActionMailer::Base.smtp_settings = {
    :address              => "smtp.qlc.co.in",
    :port                 => 25,
    :domain               => "ptotem.com",
    :user_name            => "winwithet@timesgroup.in",
    :password             => "times@123",
    :authentication       => "plain",
    :enable_starttls_auto => true
}
