ActiveAdmin.register Question do
  form do |f|
    f.inputs "Quiz" do
      f.input :quiz
    end
    f.input :is_mcq

    f.inputs "Tags (separated by commas)" do
      f.input :tag_list
    end

    f.inputs "Question Type" do
      f.input :question_type, :label => 'Type', :as => :select, :collection => ["type1", "type2", "type3", "type4"]
    end

    f.inputs "Name" do
      f.input :name
    end

    f.inputs "Options" do
      f.has_many :options, :header => "" do |option|
        option.input :name
        option.input :is_correct
      end
    end

    f.inputs "Insertion Date" do
      f.input :insertion_date
    end

    f.inputs "Display Time" do
      f.input :display_time
    end

    f.inputs "Question Active Time" do
      f.input :close_time
    end

    f.inputs "Happy Hour" do
      f.input :happy_hr
    end

      f.inputs do
        f.input :view_article, :as => :file
      end

    f.actions

  end
end
