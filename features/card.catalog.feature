Feature: Card Catalog
  An user wants to add a Card into the catalogue

  @Catalog
  Scenario Outline: Create a Card by an user
    Given a Card of number <number> and of expiration <expiration> and of cryptogramme <cryptogramme>
    When user want to create a card
    Then the card is created

    Examples:
      | number           | expiration     | cryptogramme  |
      | 098794867        | 1590962400000  | 899           |

