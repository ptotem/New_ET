class NotificationMailer < ActionMailer::Base
  default from: 'ashwin@ptotem.com'

  def welcome_email(user)
    @user = user
    mail(to: @user, subject: 'Welcome to My Awesome Site')
  end
end
