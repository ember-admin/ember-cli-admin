class UsersController < ActionController::Base

  def index
    page = (params[:page] || 1).to_i
    per_page = (params[:per_page] || 25).to_i
    count = page * per_page
    start = 0
    start = (page - 1) * per_page if page > 1
    render json: {users: User.all()[start...count]}
  end

  def destroy
    User.find(params[:id]).destroy()
    render status: 204, nothing: true
  end

  def show
    render json: {user: User.find(params[:id])}
  end

  def create
    user = User.create!(params[:user])
    render json: {user: user}
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(params[:user])
    render json: {user: user}
  end

end
