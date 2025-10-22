Feature: Adding Item in the Cart
Scenario: Changing Password
Given I am on the login page
When I login with the valid credentials
And I add "Sauce Labs Backpack" in the cart
And I go to the cart page
Then I validate the cart