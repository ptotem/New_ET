ActiveAdmin.register Feedback do
  show do
    h3 feedback.comment
    div do
      simple_format feedback.email
      simple_format feedback.subject
      simple_format feedback.page
    end
  end
end


