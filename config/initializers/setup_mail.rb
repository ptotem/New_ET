ActionMailer::Base.smtp_settings = {
    :address => "smtp.gmail.com",
    :port => 587,
    :domain => "ptotem.com",
    :user_name => "winwithet@gmail.com",
    :password => "p20o20e13",
    :authentication => "plain",
    :enable_starttls_auto => true
}


#ActionMailer::Base.raise_delivery_errors = true
#ActionMailer::Base.delivery_method = :sendmail
#ActionMailer::Base.smtp_settings = {
#    :address        => 'mail.amv3.qlc.co.in',
#    :port           => 25,
#    :authentication => :plain,
#    :user_name      => 'winwithet@timesgroup.in',
#    :password       => 'times@123',
#    :domain         => 'qlc.co.in',
#    :enable_starttls_auto => true
#}
#ActionMailer::Base.default_url_options = { :host => 'http://amv3.qlc.co.in' }