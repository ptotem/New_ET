class Authentication < ActiveRecord::Base
  attr_accessible :provider, :uid, :user_id
  belongs_to :user

  rails_admin do
    visible false
  end
end
