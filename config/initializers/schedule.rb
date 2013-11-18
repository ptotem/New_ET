require 'rubygems'
require 'rufus/scheduler'  
scheduler = Rufus::Scheduler.start_new
# scheduler.every("1m") do
#     User.score_update
# end

scheduler.cron '55 12 * * *' do
  puts 'Cron Started'
  Response.decide_daily_winner
  User.send_response
  puts 'Cron ended'
end

scheduler.cron '55 13 * * fri' do
  puts 'Cron Started======'
  WeekWinner.add_weekly_winners
  puts 'Cron ended'
end

scheduler.cron '00 20 * * *' do
  puts 'Cron Started'
  WeeklyLeader.add_weekly_leader
  puts 'Cron ended'
end

