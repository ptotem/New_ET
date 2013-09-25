ETNew::Application.routes.draw do
  match 'feedbacks' => 'feedbacks#create', :as => :feedback

  match 'feedbacks/new' => 'feedbacks#new', :as => :new_feedback

  devise_for :admin_users, ActiveAdmin::Devise.config
  #devise_for :users
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  get 'tags/:tag', :to=> 'quiz#archives', :as=>"tag"
  match "/quiz"=>"quiz#index"
  match "/archives"=>"quiz#archives_index"
  match "/leaderboards"=>"quiz#leaderboard"
  match "/profile"=>"quiz#profile"
  match "/create_response", :to=> "response#create_response", :as=> "create_response"
  match "/add_bonus", :to=> "response#add_bonus", :as=> "add_bonus"
  match "/add_bonus_tt", :to=> "response#add_bonus_tt", :as=> "add_bonus_tt"
  match "/send_ref_mail", :to=> "response#send_ref_mail", :as=> "ref_mail"
  match "/view_question_stat/:id", :to=> "response#view_question_stat"
  match "/load_question", :to=> "response#load_question", :as=> "load_question"
  match "/update_profile", :to=> "quiz#change_profile", :as=> "update_profile"
  match "/control_edit_profile_modal", :to=> "welcome#control_edit_profile_modal", :as=> "control_edit_profile_modal"
  match "/each_question_data/:id",:to=>"response#each_question_data",:as=>"each_question_data"
  match "/each_participant_data/:id",:to=>"response#each_participant_data",:as=>"each_question_data"
  match "/all_question_data",:to=>"response#all_question_data",:as=>"each_question_data"
  match "/all_participant_data",:to=>"response#all_participant_data",:as=>"each_question_data"
  match "/recent_activity", :to=>"quiz#recent_activity"
  match "/get_score", :to=>"quiz#get_score"
  match "/update_fb_sign_in_score", :to=>"welcome#update_fb_sign_in_score"
  match "/cs", :to=>"quiz#current_status"
  match '/create_guest_user' => "welcome#create_guest_user", :as => :create_guest_user
  match '/my_new_user' => "welcome#my_new_user", :as => "my_new_user"
  match '/tag_list' => "response#tag_list", :as => "tag_list"
  match '/question_details/:date_id' => "response#question_details", :as => "question_details"

  match '/mobile_no_checking' => "welcome#mobile_no_checking", :as => "mobile_no_checking"
  match '/change_password' => "welcome#change_password", :as => "change_password"


  match '/get_connections/(:access_token)' => "welcome#get_connections", :as => "get_connections"
  match '/parse_facebook_cookies' => "welcome#parse_facebook_cookies"
  match '/send_response'=>"response#send_response", :as=>"send_response"
  match '/send_message_to_frnd/:frnd_id' => "welcome#send_message_to_frnd", :as => "send_message_to_frnd"


  #match '/users/auth/facebook' => 'welcome#facebook'
  get '/users/auth/:provider/callback' => 'welcome#facebook'


  #SMS api route
  match '/response',:to=>"response#res"
  match '/response/:auth/:uname/:message/:request_id', :to=>"response#user_reg",:as=>"user_reg_path"
  # The priority is based upon order of creation:
  # first created -> highest priority.
  namespace :api do
      # put your routes here
    resources :tests
    match "/res",:to=>"tests#res"
  end
  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  resources :welcome

  root :to => 'welcome#index'
  ActiveAdmin.routes(self)

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
