class UsersController < ActionController::Base

  def index
    page = (params[:page] || 1).to_i
    per_page = (params[:per_page] || 25).to_i
    count = page * per_page
    start = 0
    start = (page - 1) * per_page if page > 1
    render json: {users: User.order('id desc').all()[start...count]}
  end

  def destroy
    User.find_by_id(params[:id]).try(:destroy)
    render status: 204, nothing: true
  end

  def show
    render json: {user: User.find(params[:id])}
  end

  def create
    user = User.create!(permit_params)
    render json: {user: user}
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(permit_params)
    render json: {user: user}
  end

  private
  def permit_params
    params.require(:user).permit(:name, :email)
  end
end
