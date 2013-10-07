class Admin::CarsController < ApplicationController

  def index
    render json: Car.paginate(page: params[:page], per_page: params[:per_page]).order('id desc')
  end

  def destroy
    Car.find_by_id(params[:id]).try(:destroy)
    render status: 204, nothing: true
  end

  def show
    render json: Car.find(params[:id])
  end

  def create
    car = Car.create!(permit_params)
    set_attachment_id(car.id)
    render json: car
  end

  def update
    car = Car.find(params[:id])
    car.update_attributes(permit_params)
    render json: car
  end

  private
  def permit_params
    params.require(:car).permit(:title, :color, :description)
  end

  def attachment
    attachments = {}
    attachments[:car_image] = params[:car][:car_image_id]
    attachments[:car_images] = params[:car][:car_image_ids]
    attachments
  end

  def set_attachment_id(id)
    CarImage.find(attachment[:car_image]).update_attributes({assetable_id: id}) if attachment[:car_image]
    CarImage.find(attachment[:car_images]).each {|car_image| avatar.assetable_id = id; car_image.save()} if attachment[:car_images]
  end
end