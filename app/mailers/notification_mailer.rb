class NotificationMailer < ActionMailer::Base
  default from: 'ashwin@ptotem.com'

  def welcome_email(user,cu)
    @user = user
    @current_user=cu
    mail(to: @user, subject: 'Welcome to Win With ET')
  end
end
