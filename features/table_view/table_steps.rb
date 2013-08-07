When(/^I click delete link in item "(.*?)"$/) do |id|
  page.all("table tr")[id.to_i].find("a[title='delete']").click
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
  page.all("table tr").count.should be (count.to_i + 1)
end

Then(/^I should see base actions links/) do
  %w(edit show delete).each do |action|
    page.has_css?("a[title='#{action}']").should   be true
  end
end

Then(/^I should see additions actions links$/) do
  page.has_css?("a[title='clone']").should   be true
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



