Then(/^I should see table view$/) do
  page.has_css?(".table-striped").should be true
end

Then(/^I should see (\d+) items in table$/) do |count|
  page.all("table tr").count.should be (count.to_i + 1)
end