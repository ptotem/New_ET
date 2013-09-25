require 'rubygems'
require 'rufus/scheduler'  
scheduler = Rufus::Scheduler.start_new
# scheduler.every("1m") do
#     User.score_update
# end

scheduler.cron '33 12 * * *' do
    puts 'Cron Started'
    User.send_response
    puts 'Cron ended'
end
