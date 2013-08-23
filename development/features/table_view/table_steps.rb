Given(/^some users (\d+) in db$/) do |count|
  5.times do
    Address.create!(title: Forgery::Name.title)
  end

  count.to_i.times do
    FactoryGirl.create(:user, address_id: Address.all.sample.id)
  end

  Address.create!(title: "test_address")
end

When(/^I click (.*?) link in item "(.*?)"$/) do |action, id|
  page.all("table tr")[id.to_i].find("button[title='#{action}']").click
end

When(/^I check (\d+) and (\d+) items$/) do |id1, id2|
  page.all("table tr")[id1.to_i].find("input[type='checkbox']").set(true)
  page.all("table tr")[id2.to_i].find("input[type='checkbox']").set(true)
end

When(/^I check all items$/) do
  find("#select-all-batches").set(true)
end

Then(/^I should see table view$/) do
  page.has_css?(".table-striped").should be true
end

Then(/^I should see (\d+) items in table$/) do |count|
  if count.to_i == 0
    count = 1
  end
  page.all("table tr").count.should be (count.to_i + 1)
end

Then(/^I should see base actions links/) do
  %w(Edit Show Delete).each do |action|
    page.has_css?("button[title='#{action}']").should   be true
  end
end

Then(/^I should see additions actions links$/) do
  page.has_css?("button[title='clone']").should   be true
end

Then(/^I should see confirm popup with "(.*)"$/) do |title|
  within ".modal-dialog" do
    page.should have_content(title)
    page.should have_content("Close")
    page.should have_content("Confirm")
  end
end

Then(/^I uncheck all items$/) do
  find("#select-all-batches").set(false)
end

Then(/^I should see empty view with spinner$/) do
  page.all("table tr").count.should be 2
  page.has_css?(".icon-spinner")
end

When(/^I change per page to (\d+)$/) do |per_page|
  click_button(per_page)
end

Then(/^I select "(.*?)"$/) do |text|
  select(text)
end
