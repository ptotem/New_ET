ActiveAdmin.register Bonus do
  form do |f|
    f.inputs "Details" do
      f.input :name
      f.input :wagerable
    end
    f.inputs "Points Bonus" do
      f.input :multiplier
      f.input :plus
      f.input :minus
    end
    f.inputs "Triggers" do
      f.input :end_time,:as=>:just_time_picker, :label => "If Before"
      f.input :start_time,:as=>:just_time_picker, :label => "If After"
    end
    f.actions
  end
end
