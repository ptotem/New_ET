require 'rubygems'
require 'rufus/scheduler'  
scheduler = Rufus::Scheduler.start_new
scheduler.every("1s") do
  puts 'Cron Started'
    User.create(:email => "abc#{Time.now.to_i}@gmail.com", :username => params[:uname], :password => passwd, :password_confirmation => passwd)
  puts 'Cron ended'   #User.score_update
end

#scheduler.cron '38 1 * * *' do
#    puts 'Cron Started'
#    Response.decide_daily_winner
#    User.send_response
#    puts 'Cron ended'
#end
