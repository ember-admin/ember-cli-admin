
def create_users
  User.destroy_all()

  _pictures = pictures('avatars')

  100.times do
    user = User.new(email: Forgery(:internet).email_address, name: Forgery::Name.full_name, address_id: Address.all.sample.try(:id))
    user.avatar = Avatar.new
    user.avatar.data = File.open(_pictures.sample)
    user.save!
  end
end

def create_addresses
  Address.destroy_all()
  20.times do
    Address.create!(title: Forgery(:address).street_address)
  end
end

def create_cars
  Car.destroy_all()
  _pictures = pictures('cars')

  200.times do
    car = Car.new(title: Forgery(:lorem_ipsum).words(10), color: Forgery::Basic.hex_color, description: Forgery(:lorem_ipsum).words(30))
    car.car_image = CarImage.new
    car.car_image.data = File.open(_pictures.sample)
    car.save!
  end
end

def pictures(path)
  pictures_path = Rails.root.join('public', path, '*.jpg')
  Dir.glob(pictures_path).map { |entry| File.new(entry)}
end

#insert fake data
create_addresses
create_cars
create_users