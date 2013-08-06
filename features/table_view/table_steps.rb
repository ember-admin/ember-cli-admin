Then(/^I should see table view$/) do
  page.should have_selector(".table-striped")
end