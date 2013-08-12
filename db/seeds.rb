User.destroy_all()
100.times do
  User.create!(email: Forgery(:internet).email_address, name: Forgery::Name.full_name)
end
