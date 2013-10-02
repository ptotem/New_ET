# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(:email => "admin@ptotem.com",:password => "password",password_confirmation:"password",role:'Superadmin',age:22,name:"Sunny Singh",location:"Mumbai, Maharahstra",industry:"IT",username:"9029770085")
AdminUser.create!(email:"admin1@ptotem.com",password:"password",password_confirmation:"password",username:"1234567890")
Quiz.create!(name: "Know your ET", is_survey: false, plus: 10, minus: 0)
Bonus.create!(name: "Double Trouble", multiplier: 1, plus:20, minus: 10, wagerable:true)
Bonus.create!(name: "Triple Try", multiplier: 1, plus:30, minus: 10, wagerable:true)