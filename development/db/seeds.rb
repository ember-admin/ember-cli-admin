User.destroy_all()
Address.destroy_all()

20.times do
  Address.create!(title: Forgery::Name.title)
end

100.times do
  User.create!(email: Forgery(:internet).email_address, name: Forgery::Name.full_name, address_id: Address.all.sample.try(:id))
end

