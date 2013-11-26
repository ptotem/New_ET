class NotificationMailer < ActionMailer::Base
  default :from => '"winwithet@timesgroup.in"'

  def welcome_email(user,cu)
    @user = user
    @current_user=cu
    mail(to: @user, subject: 'Welcome to Win With ET')
  end

  def welcome2_email(user,cu)
    @user = user
    @current_user=cu
    mail(to: @user, subject: 'Welcome to Win With ET')
  end
end
