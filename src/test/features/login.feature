Feature: SWAGLABS Login Functionality

Scenario: Login and Logout with valid credentials
Given I am on the login page
When I login with the valid credentials
And I clicked on the settings button
And I clicked on the "logout" button
Then I route back to the login page

Scenario Outline: Login and Logout with invalid credentials
Given I am on the login page
When I login with the invalid credentials
Then I should get the login failed "<message>"
Examples:
    | message |
    | Username and password do not match any user in this service |

Scenario Outline: Login and Logout without credentials
Given I am on the login page
When I login without credentials
Then I should get the login failed "<message>"
Examples:
    | message |
    | Username is required |