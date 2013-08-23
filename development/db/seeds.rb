User.destroy_all()
Address.destroy_all()
Car.destroy_all()

20.times do
  Address.create!(title: Forgery::Name.title)
end

100.times do
  User.create!(email: Forgery(:internet).email_address, name: Forgery::Name.full_name, address_id: Address.all.sample.try(:id))
end

200.times do
  Car.create!(title: Forgery(:lorem_ipsum).words(10), color: Forgery::Basic.hex_color, description: Forgery(:lorem_ipsum).words(30))
end

