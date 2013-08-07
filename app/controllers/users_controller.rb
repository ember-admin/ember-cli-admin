class UsersController < ActionController::Base

  def index
    page = (params[:page] || 1).to_i
    per_page = (params[:per_page] || 25).to_i
    count = page * per_page
    start = 0
    start = (page - 1) * per_page if page > 1
    render json: {users: collections.slice(start, count)}
  end

  private

  def collections
    @collections ||= generate()
  end

  def generate
    @collections = []
    100.times do |i|
      @collections.push({id: i, email: Forgery(:internet).email_address})
    end
    @collections
  end

end
