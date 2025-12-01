Feature: Adding Product Functionality

Scenario Outline: Validating added product in the cart
Given I am on the login page
When I login with the valid credentials
And I add "<product>" in the cart
And I go to the cart page
Then I validate the cart
Examples:
    | product |
    | Sauce Labs Backpack |