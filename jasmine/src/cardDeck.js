class CardDeck {
  constructor() {
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const suits = ["D", "H", "C", "S"]
    this._cards = []
    for (const suit of suits) {
      for (const rank of ranks) {
        this._cards.push(new Card(rank, suit))
      }
    }
  }

  cardsLeft() {
    return this.cards().length
  }

  refill(player) {
    [1, 2, 3, 4, 5].forEach((num) => {
      const card = this.takeCard()
      player.addCards([])
      if (card) { player.addCards([card]) }
    })
  }

  cards() {
    return this._cards
  }

  takeCard() {
    if (this.hasCards() === true) {
      return this._cards.pop()
    }
  }

  deal() {
    const arr = [[], [], [], []]
    for (let i = 0; i < 5; i++) {
      for (const deck of arr) {
        deck.push(this.takeCard())
      }
    }
    return arr
  }

  removeAllCardsFromDeck() {
    this._cards = []
  }

  hasCards() {
    if (this.cardsLeft() > 0) {
      return true
    } else {
      return false
    }
  }

  shuffle() {
    const deck = this.cards();
    let m = deck.length; let i
    while (m) {
      i = Math.floor(Math.random() * m--);
      [deck[m], deck[i]] = [deck[i], deck[m]]
    }
    this._cards = deck
  }
}
