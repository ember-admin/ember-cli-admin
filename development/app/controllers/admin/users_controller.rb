class Admin::UsersController < ActionController::Base

  def index
    render json: {users: User.paginate(page: params[:page], per_page: params[:per_page]).order('id desc')}
  end

  def destroy
    #User.find_by_id(params[:id]).try(:destroy)
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
