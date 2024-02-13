Feature: Search for a flight in Vueling

  Scenario Outline: As a user, I can found a flight for date selected

    Given I am on the Vueling page
    When I search for a flight from <Origin> to <Destination>
    Then I should see a flight

    Examples:
      | Origin | Destination     | Date        | Pasangger  |
      | Madrid | Barcelona       | 01/06/2024  | 1          |
