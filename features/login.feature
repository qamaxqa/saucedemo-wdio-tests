Feature: Login

  Scenario Outline: Login with different users
    Given I open the SauceDemo login page
    When I login with username "<username>" and password "secret_sauce"
    Then login result should be "<result>" with message "<message>"

    Examples:
      | username        | result  | message                                             |
      | standard_user   | success |                                                     |
      | locked_out_user | error   | Epic sadface: Sorry, this user has been locked out. |
