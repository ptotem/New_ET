class Question < ActiveRecord::Base
  attr_accessible :answer, :is_mcq, :name, :insertion_date, :quiz_id, :happy_hr,:tag_list, :question_type, :options_attributes,:display_time,:close_time,:view_article,:promotions,:promotions_attributes,:promotion_ids
  just_define_datetime_picker :insertion_date, :add_to_attr_accessible => true
  has_many :options, :dependent => :destroy
  has_many :responses, :dependent => :destroy
  accepts_nested_attributes_for :options
  has_and_belongs_to_many :bonus
  has_and_belongs_to_many :promotions
  belongs_to :quiz

  has_many :daily_winners

  has_attached_file :view_article, styles: {thumb: "100x100#"}
  #belongs_to :tag
  acts_as_taggable


  def self.find_by_year(year)
    #where("strftime('%Y', insertion_date) =?", year) and
    where("MONTH(insertion_date)="+"#{8}")
  end


  def self.show_sales_for_current_month(year, month)
    mydate = Date.new(year, month, 1)
    where(':first_day <= insertion_date AND insertion_date <= :last_day', {:first_day => mydate,:last_day => mydate.at_end_of_month}).order('insertion_date')
  end

  def self.show_for_current_week
    where(':first_day <= insertion_date AND insertion_date <= :last_day',{:first_day=>Date.today.at_beginning_of_week,:last_day=>Date.today.at_end_of_week})
  end

  def self.show_for_selected_week(selected_date)
    where(':first_day <= insertion_date AND insertion_date <= :last_day',{:first_day=>selected_date.at_beginning_of_week,:last_day=>selected_date.at_end_of_week})
  end
end
