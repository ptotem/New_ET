ActionMailer::Base.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :domain               => "ptotem.com",
    :user_name            => "winwithet@gmail.com",
    :password             => "p20o20e13",
    :authentication       => "plain",
    :enable_starttls_auto => true
}
