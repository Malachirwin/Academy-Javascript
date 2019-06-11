describe("CardDeck", () => {
  beforeEach(() => {
    deck = new CardDeck()
  })
  it("Has fifty two cards", () => {
    expect(deck.cardsLeft()).toEqual(52)
  });

  it("shuffles cards", () => {
    const cards = [...deck.cards()]
    deck.shuffle()
    expect(deck.cards()).not.toEqual(cards);
  });

  it("removes top card", () => {
    card = deck.takeCard()
    expect(deck.cardsLeft()).toEqual(51)
    expect(card.constructor.name).toEqual("Card")
  });

  it("Deals cards to four piles", () => {
    const dealtCards = deck.deal()
    const numberOfPlayers = 4
    const numberOfCardsInAHand = 5
    expect(dealtCards.length).toEqual(numberOfPlayers)
    expect(dealtCards[0].length).toEqual(numberOfCardsInAHand)
    expect(deck.cardsLeft()).toEqual(32)
  });

  it("removes all cards from the deck", () => {
    deck.removeAllCardsFromDeck()
    expect(deck.cards()).toEqual([])
  });

  it("checks if there are any cards left", () => {
    expect(deck.hasCards()).toEqual(true)
    deck.removeAllCardsFromDeck()
    expect(deck.hasCards()).toEqual(false)
  });
});
