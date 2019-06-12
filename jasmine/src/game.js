class Game {
  constructor(name) {
    this._deck = new CardDeck()
    this._deck.shuffle()
    const playersHands = this._deck.deal()
    this._players = [new Player(name, playersHands[0])]
    this._playerTurn = 1
    Array.from([1, 2, 3]).forEach((num) => { this._players.push(new Player(Names.name(), playersHands[num])) })
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

  book(request, result) {
    if (result === "Go fish") {
      return (`${request.playerWhoWasAsked} said ${result} to ${request.playerWhoAsked}`)
    } else {
      return (`${request.playerWhoAsked} took the ${result} from ${request.playerWhoWasAsked}`)
    }
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
            const cardDrawn = this.deck().takeCard()
            if (card !== undefined) {
              playerToGiveCards.addCards([cardDrawn])
            }
            return "Go fish"
          }
        }
      }
      return "you can't ask that"
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
    this.players().forEach((player) => {
      if (player.points() > highestScore) {
        highestScore = player.points()
        winner = player
        tie = []
        tie.push(winner.name())
      } else if (player.points() === highestScore) {
        tie.push(player.name())
      }
    })
    if (tie.length !== 1) {
      return `${tie.join(", ")} tied with ${highestScore} points`
    } else {
      return `${winner.name()} had the most points with ${highestScore} points`
    }
  }

  pair() {
    for (const player of this.players()) {
      player.pairCards()
    }
  }

  noCards() {
    if (this.deck().hasCards() === true) {
      this.players().forEach((player) => {
        if (player.cardsLeft() === 0) {
          this.deck().refill(player)
        }
      })
    }
  }

  findPlayerByName(name) {
    let thePlayer
    this.players().forEach((player) => {
      if (player.name() === name) {
        thePlayer = player
      }
    })
    return thePlayer
  }

  doTurn(playerRequest) {
    const playerWhoWasAsked = this.findPlayerByName(playerRequest.playerWhoWasAsked);
    const playerWhoAsked = this.findPlayerByName(playerRequest.playerWhoAsked);
    const result = this.cardInPlayerHand(playerWhoWasAsked, playerRequest.desired_rank, playerWhoAsked);
    this.noCards();
    this.players().forEach((player) => {
      player.playerHand().forEach((card) => {
        if (card === undefined) {
          player.playerHand().splice(player.playerHand().indexOf(card), 1)
        }
      })
    })
    this.pair();

    return result
  }

  playerWhoIsPlaying() {
    return this.players()[this._playerTurn - 1]
  }

  deck() {
    return this._deck
  }
}
