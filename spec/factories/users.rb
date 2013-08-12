FactoryGirl.define do
  factory :user do
    sequence(:email) {|n| "email#{n}@admin.test" }
    sequence(:name) {|n| "user_name#{n}"}
  end
end