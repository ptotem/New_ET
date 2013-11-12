class WeeklyLeader < ActiveRecord::Base
  attr_accessible :points, :user_id, :week_no, :year


  def self.add_weekly_leader
    @usrs=Array.new
    WeeklyLeader.delete_all
    @week_leader=Array.new
    @week_questions=Question.show_for_current_week - Question.find_all_by_insertion_date((Time.zone.now).to_date)
    @week_questions.each do |q|
      @usrs<<Response.find_all_by_question_id(q.id).map { |i| i.user_id }
    end
    @usrs=@usrs.flatten.uniq
    @usrs.each do |u|
      @user_res=Array.new
      @week_questions.each do |q|
        @user_res<<Response.find_all_by_question_id_and_user_id(q.id, u).last
      end
      @user_res=@user_res.delete_if { |x| x==nil }
      @week_leader<<{:user_id => u, :score => @user_res.map { |i| i.points rescue 0 }.delete_if{|x| x==nil}.sum}
    end

    @week_leader.sort_by {|hash| hash[:score]}.reverse[0..2].each do |winner|
      WeeklyLeader.create(:year => Time.now.year,:week_no => Time.now.strftime("%U").to_i,:user_id => winner[:user_id].to_i, :points => winner[:score].to_i)
    end

  end

end
