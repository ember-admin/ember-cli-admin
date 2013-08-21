class Admin::AddressesController < ActionController::Base

  def index
    render json: {users: Address.paginate(page: params[:page], per_page: params[:per_page]).order('id desc')}
  end

  def destroy
    #User.find_by_id(params[:id]).try(:destroy)
    render status: 204, nothing: true
  end

  def show
    render json: {address: Address.find(params[:id])}
  end

  def create
    address = Address.create!(permit_params)
    render json: {address: address}
  end

  def update
    address = Address.find(params[:id])
    address.update_attributes(permit_params)
    render json: {address: address}
  end

  private
  def permit_params
    params.require(:address).permit(:title)
  end
end
