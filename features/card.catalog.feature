Feature: Card Catalog
  An user wants to add a Card into the catalogue

  @Catalog
  Scenario Outline: Create a Card by an user
    Given a Card of cardNumber <cardNumber> and of expiration <expiration> and of cryptogramme <cryptogramme> and of solde <solde>
    When user want to create a card
    Then the card is created

    Examples:
      | cardNumber           | expiration     | cryptogramme  | solde |
      | 498794867            | 1685570400000  | 899           | 6000  |

  Scenario Outline: Get all Card by an user
    Given a Card of cardNumber <cardNumber> and of expiration <expiration> and of cryptogramme <cryptogramme> and of solde <solde>
    When user want to get all card
    Then all card is get

    Examples:
    | cardNumber           | expiration     | cryptogramme  | solde |
    | 498794867            | 1685570400000  | 899           | 6000  |

  Scenario Outline: Get one Card which can be used by an user
    Given a Card of cardNumber <cardNumber> and of expiration <expiration> and of cryptogramme <cryptogramme> and of solde <solde>
    When user want to get one card of cardNumber <cardNumber> and of expiration <expiration> and of cryptogramme <cryptogramme>
    Then user get his card

    Examples:
    | cardNumber           | expiration     | cryptogramme  | solde |
    | 498794867            | 1685570400000  | 899           | 6000  |


  Scenario Outline: Do a transaction with one card
    Given a Card of cardNumber <cardNumber> and of expiration <expiration> and of cryptogramme <cryptogramme> and of solde <solde>
    When user want to get one card of cardNumber <cardNumber> and of expiration <expiration> and of cryptogramme <cryptogramme>
    When user want to do a transaction of price <price>
    Then user has done the transaction

    Examples:
    | cardNumber           | expiration     | cryptogramme  | solde | price |
    | 498794867            | 1685570400000  | 899           | 6000  | 500   |
