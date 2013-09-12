require 'ffaker'
namespace :db do
  desc "Create dummy slides in the development database."

  task :populate => :environment do
    require 'ffaker'
    User.create!(:email => "admin@ptotem.com",:password => "password",password_confirmation:"password",role:'Superadmin',age:22,name:"Sunny Singh",location:"Mumbai, Maharahstra",industry:"IT")
    quiz = Quiz.create!(name: "Know your ET", is_survey: false, plus: 10, minus: 0)
    50.times do
      User.create(email: random_unique_email ,password:"password",password_confirmation:"password",role:'Player',
                        age:Random.new.rand(15..60),workx:Random.new.rand(1..40),
                        name:Faker::Name.name,
                        location:["Mumbai, Maharashtra","Ahmedabad, Gujrat","Hyderabad, AP","Chennai, Tamilnadu","Chandigadh, Punjab"].sample,
                        industry:["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample
                        )
    end


    50.times do
      question = Question.create!(
          name: Faker::Lorem.sentence(1),
          answer: Faker::Lorem.sentence(1),
          insertion_date: (rand*30).ceil.days.ago,
          tag_list:["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample+","+["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample+','+["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample,
          is_mcq: true
      )
      3.times do
        question.options.build(
            name: Faker::Lorem.words(4),
            is_correct: false
        )
      end
      question.options.build(
          name: Faker::Lorem.words(4),
          is_correct: true
      )

      quiz.questions<<question
    end
    question1 = Question.create!(
        name: Faker::Lorem.sentence(1),
        answer: Faker::Lorem.sentence(1),
        insertion_date: Date.today,
        tag_list:["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample+","+["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample+','+["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample,
        is_mcq: true
    )
    3.times do
      question1.options.build(
          name: Faker::Lorem.words(4),
          is_correct: false
      )
    end
    question1.options.build(
        name: Faker::Lorem.words(4),
        is_correct: true
    )

    question2 = Question.create!(
        name: Faker::Lorem.sentence(1),
        answer: Faker::Lorem.sentence(1),
        insertion_date: Date.yesterday,
        tag_list:["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample+","+["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample+','+["IT","Banking","Finance","HR","Public","Cinema","Economy"].sample,
        is_mcq: true
    )
    3.times do
      question2.options.build(
          name: Faker::Lorem.words(4),
          is_correct: false
      )
    end
    question2.options.build(
        name: Faker::Lorem.words(4),
        is_correct: true
    )
    quiz.questions<<question1
    quiz.questions<<question2

    Bonus.create!(name: "Double Trouble", multiplier: 1, plus:20, minus: 10, wagerable:true)
    Bonus.create!(name: "Weekly", multiplier: (rand*3).ceil, plus:0, minus: 0, wagerable:false)
    Bonus.create!(name: "Monthly", multiplier: (rand*5).ceil, plus:0, minus: 0, wagerable:false)
    Bonus.create!(name: "Early Bird", multiplier: 1, plus:20, minus: 0, wagerable:false, end_time:Time.now)

    bonus_questions=Question.all.sample(15)
    15.times do |i|
      bonus=Bonus.all.sample
      bonus.questions << bonus_questions[i]
    end

    20.times do |i|
      u=User.all[i]
      50.times do |j|
        q=Question.all[j]
        answer=q.options.sample
        Response.create!(:user_id=>u.id,:question_id=>q.id,:option_id=>answer.id,:answer=>answer.name,:points=>[-30,-20,-10,0,10,30,50,70].sample)
      end
    end

  end

  def random_unique_email
    Faker::Internet.email.gsub('@', "+#{50}@")
  end
end