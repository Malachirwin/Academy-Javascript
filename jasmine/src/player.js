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
