ActiveAdmin.register Promotion do
  form do |f|
    f.inputs "Details" do
      f.input :name
    end

    f.inputs "Points Bonus" do
      f.input :multiplier
    end
    f.actions
  end
end
