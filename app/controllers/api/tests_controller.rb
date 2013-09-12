class Api::TestsController<ApiController
  def res
    #render :text=>"hello"
    #return
    @task="Hiii"
    respond_to do |f|
      f.json {render @task}
    end
  end

  def index
    #render :text=>"index"
    #return
  end
end