class Game {
  constructor(name) {
    this._players = []
    this._deck = new CardDeck()
    this._deck.shuffle()
    this._playerTurn = 1
    const playersHands = this._deck.deal()
    for (let i = 1; i < 5; i++) {
      if (i === 1) {
        this._players.push(new Player(name, playersHands[i - 1]))
      } else {
        this._players.push(new Player(Names.name(), playersHands[i - 1]))
      }
    }
  }

  players() {
    return this._players
  }

  playerTurn() {
    return this._playerTurn
  }

  player() {
    return this.players()[0]
  }

  playerSetHand(playerNumber, cards) {
    this.findPlayer(playerNumber).setHand(cards)
  }

  findPlayer(id) {
    return this.players()[id - 1]
  }

  cardInPlayerHand(playerToAsk, rank, playerToGiveCards) {
    try {
      const cardsFromPlayer = []
      const cardsToRemove = []
      const results = []
      for (const card of playerToGiveCards.playerHand()) {
        if (rank.toString() === card.rank()) {
          for (const cardFromPlayer of playerToAsk.playerHand()) {
            if (rank.toString() === cardFromPlayer.rank()) {
              cardsFromPlayer.push(cardFromPlayer)
              cardsToRemove.push(cardFromPlayer)
              results.push(cardFromPlayer.value())
            }
          }
          for (const cardToDelete of cardsToRemove) {
            playerToAsk.playerHand().splice(playerToAsk.playerHand().indexOf(cardToDelete), 1)
          }
          playerToGiveCards.addCards(cardsFromPlayer)
          if (results.length !== 0) {
            return `${results.join(", ")}`
          } else {
            this.nextTurn()
            playerToGiveCards.addCards([this.deck().takeCard()])
            return "Go fish"
          }
        } else {
          return "you can't ask that"
        }
      }
    } catch (err) {
      console.error(err)
      return "you can't ask that"
    }
  }

  nextTurn() {
    if (this.playerTurn() === this.players().length) {
      this._playerTurn = 1
    } else {
      this._playerTurn += 1
    }
  }

  winner() {
    const result = []
    if (this.deck().hasCards() === false) {
      for (const player of this.players()) {
        if (player.cardsLeft() === 0) {
          result.push(true)
        } else {
          result.push(false)
        }
      }
    }
    const compareToResult = []
    for (let i = 0; i < this.players().length; i++) {
      compareToResult.push(true)
    }
    if (JSON.stringify(result) === JSON.stringify(compareToResult)) {
      return this.gameEnd()
    } else {
      return false
    }
  }

  removeAllCardsFromDeck() {
    this._deck.removeAllCardsFromDeck()
  }

  gameEnd() {
    let highestScore = -1
    let winner = ""
    let tie = []
    for (const player of this.players()) {
      if (player.points() > highestScore) {
        highestScore = player.points()
        winner = player
        tie = []
        tie.push(winner.name())
      } else if (player.points() === highestScore) {
        tie.push(player.name())
      }
    }
    if (tie.length !== 1) {
      return `${tie.join(", ")} tied with ${highestScore} points`
    } else {
      return `${winner.name()} had the most points with ${highestScore} points`
    }
  }

  pair() {
    try {
      for (const player of this.players()) {
        const matches = []
        for (const card of player.playerHand()) {
          const valueOfCard = card.rank()
          for (const deepCard of player.playerHand()) {
            if (valueOfCard === deepCard.rank()) {
              matches.push(deepCard)
            }
          }
          if (matches.length === 4) {
            player.match(matches)
            for (const cardToDelete of matches) {
              player.playerHand().splice(player.playerHand().indexOf(cardToDelete), 1)
            }
          }
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  deck() {
    return this._deck
  }
}
