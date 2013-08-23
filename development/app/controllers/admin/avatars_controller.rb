class Admin::AvatarsController < ActionController::Base

  def index
    render json: Avatar.paginate(page: params[:page], per_page: params[:per_page]).order('id desc')
  end

  def destroy
    Avatar.find_by_id(params[:id]).try(:destroy)
    render status: 204, nothing: true
  end

  def show
    render json: Avatar.find(params[:id])
  end

  def create
    avatar = Avatar.create!(permit_params)
    render json: avatar
  end

  def update
    avatar = Avatar.find(params[:id])
    avatar.update_attributes(permit_params)
    render json: avatar
  end

  private

  def permit_params
    options = params.require(:avatar).permit(:id, :assetable_id, :assetable_type, :guid, :type, :data)
    options.delete(:data) unless options[:data].present?
    options
  end
end
