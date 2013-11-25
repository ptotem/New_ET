#ActionMailer::Base.smtp_settings = {
#    :address              => "smtp.timesgroup.in",
#    :port                 => 25,
#    :domain               => "timesgroup.in",
#    :user_name            => "winwithet@timesgroup.in",
#    :password             => "times@123",
#    :authentication       => "plain",
#    :enable_starttls_auto => true
#}

ActionMailer::Base.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :domain               => "ptotem.com",
    :user_name            => "winwithet@gmail.com",
    :password             => "p20o20e13",
    :authentication       => "plain",
    :enable_starttls_auto => true
}
