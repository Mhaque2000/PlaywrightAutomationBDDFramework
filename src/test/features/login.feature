Feature: SWAGLABS Login Functionality

Scenario: Login and Logout with valid credentials
Given I am on the login page
When I login with the valid credentials
And I clicked on the settings button
And I clicked on the "logout" button
Then I route back to the login page