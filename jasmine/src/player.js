class Player {
  constructor(name, cards = []) {
    this._name = name
    this._cards = cards
    this._matches = []
  }

  name() {
    return this._name
  }

  playerHand() {
    return this._cards
  }

  addCards(cards) {
    this._cards.push(...cards)
  }

  matches() {
    return this._matches
  }

  pairCards() {
    this._cards.forEach((originalCard) => {
      const sameRank = this._cards.filter(card => card.rank() === originalCard.rank())
      if (sameRank.length === 4) {
        this._matches.push(sameRank)
        this._cards = this._cards.filter(card => !sameRank.includes(card))
      }
    })
  }

  removeCardsByRank(rank) {
    this._cards = this._cards.filter(card => !(card.rank() === rank))
  }

  match(matches) {
    this._matches.push(matches)
  }

  points() {
    return this._matches.length
  }

  cardsLeft() {
    return this.playerHand().length
  }

  setHand(cards) {
    this._cards = cards
  }
}
