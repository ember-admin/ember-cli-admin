class UsersController < ActionController::Base

  def index
    page = (params[:page] || 1)
    count = page * 25
    start = 0
    start = (page - 1) * 25 if page > 1
    render json: {users: collections.slice(start, count)}
  end

  private
  
  def collections
    @collections ||= generate()
  end

  def generate
    @collections = []
    100.times do |i|
      @collections.push({id: i, email: "email#{i}@example.com"})
    end
    @collections
  end

end
