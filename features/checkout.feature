Feature: Checkout flow

  Scenario: Complete checkout with a selected product
    Given I am logged in as "standard_user"
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should contain "1"
    When I open the cart
    Then "Sauce Labs Backpack" should be present in the cart
    When I proceed to checkout
    And I enter checkout information "Max", "Tester", "10000"
    Then the checkout overview should be displayed
    And "Sauce Labs Backpack" should be present in the checkout overview
    When I finish the checkout
    Then I should see the message "Thank you for your order!"
