Given /^pending/ do
  pending
end

Given /^(?:|I )am on (.+)$/ do |path|
  visit path
end

Given /^(?:|I )go to '(.+)'$/ do |path|
  visit path
end

Given /^(?:|I )go to '(.+)' and wait$/ do |path|
  with_ajax { visit path }
end

Then /^I should be on '(.*)'$/ do |url|
  URI.parse(current_url).path.should == url
end


When /^(?:|I )press "([^"]*)"(?: within "([^"]*)")?$/ do |title, selector|
  if selector
    within(selector) { click_button(title) }
  else
    click_button(title)
  end
end

When(/^(?:|I )press "(.*?)" and wait$/) do |title|
  with_ajax { click_button(title) }
end

When /^I fill in "(.*)" with "(.*)"$/ do |field, pystring|
  fill_in(field, :with => pystring)
end

When /^I click "(.*)"$/ do |element|
  page.find(element).click()
end

When /^I click "(.*)" and wait$/ do |selector|
  with_ajax { find(selector).click() }
end

When /^I click link "(.*)"$/ do |title|
  click_link(title)
end

When /^I check "(.*)"$/ do |element|
  page.check(element)
end

When /^(?:|I )follow "([^"]*)"(?: within "([^"]*)")?$/ do |link, selector|
  within(selector) do
    click_link(link)
  end
end

When(/^I wait for "(.*?)" seconds$/) do |seconds|
  sleep seconds.to_f
end

Then /^(?:|I )should see "([^"]*)"(?: within "([^"]*)")?$/ do |text, selector|
  code = lambda { page.should have_content(text) }
  if selector then within(selector) {  code.call } else code.call end
end

Then /^(?:|I )should see "([^"]*)"(?: within "([^"]*)")? link and wait for "(.*?)" seconds$/ do |text, selector, seconds|
  code = lambda { page.should have_link(text) }
  if selector then within(selector) {  code.call } else code.call end
  step "I wait for \"#{seconds}\" seconds" if seconds
end

Then /^(?:|I )should not see "([^"]*)"(?: within "([^"]*)")?$/ do |text, selector|
  code = lambda { page.should have_no_content(text) }
  if selector then within(selector) { code.call } else code.call end
end


Then /^(?:|I )should see \/([^\/]*)\/(?: within "([^"]*)")?$/ do |regexp, selector|
  regexp = Regexp.new(regexp)
  within(selector) do
    page.should have_xpath('//*', :text => regexp)
  end
end

Then /^(?:|I )should not see \/([^\/]*)\/(?: within "([^"]*)")?$/ do |regexp, selector|
  regexp = Regexp.new(regexp)
  with_scope(selector) do
    page.should have_no_xpath('//*', :text => regexp)
  end
end

Then(/^I should see "(.*?)" link$/) do |title|
  page.should have_link(title)
end

Then(/^I should not see "(.*?)" link$/) do |title|
  page.should_not have_link(title)
end

Then(/^print (?:|the|this) page$/) do
  puts page.body
end

Then(/^I dont should see "(.*?)"$/) do |content|
  page.should have_no_selector(content)
end

Then(/^I js click "(.*?)"$/) do |selector|
  page.execute_script("$('#{selector}').click()")
end