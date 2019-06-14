class Card {
  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
    this.ranks = { A: "Ace", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", J: "Jack", Q: "Queen", K: "King" }
    this.suits = { D: "Diamonds", H: "Hearts", C: "Clubs", S: "Spades" }
  }

  rank() {
    return this._rank
  }

  suit() {
    return this._suit
  }

  value() {
    return `${this.ranks[this.rank()]} of ${this.suits[this.suit()]}`
  }

  rankValue() {
    return this.ranks[this.rank()]
  }

  toImgPath() {
    return `public/cards/${this.suit().toLowerCase()}${this.rank().toLowerCase()}.png`
  }
}
