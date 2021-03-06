class FeedbackMailer < ActionMailer::Base
  default :from => 'noreply@yoursite.com'

  def feedback(feedback)
    @feedback = feedback
    mail(:to => 'webmaster@yoursite.com', :subject => '[Feedback for YourSite] #{feedback.subject}')
  end
end
