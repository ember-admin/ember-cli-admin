class Admin::UsersController < ActionController::Base

  def index
    render json: User.paginate(page: params[:page], per_page: params[:per_page]).order('id desc')
  end

  def destroy
    User.find_by_id(params[:id]).try(:destroy) unless Rails.env.test?
    render status: 204, nothing: true
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.create!(permit_params)
    set_attachment_id(user.id)
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(permit_params)
    render json: user
  end

  private
  def permit_params
    params.require(:user).permit(:name, :email, :address_id)
  end

  def attachment
    attachments = {}
    attachments[:avatar] = params[:user][:avatar_id]
    attachments[:avatars] = params[:user][:avatar_ids]
    attachments
  end

  def set_attachment_id(id)
    Avatar.find(attachment[:avatar]).update_attributes({assetable_id: id}) if attachment[:avatar]
    Avatar.find(attachment[:avatars]).each {|avatar| avatar.assetable_id = id; avatar.save()} if attachment[:avatars]
  end
end
