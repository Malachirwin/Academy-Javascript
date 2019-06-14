class Game {
  constructor(name) {
    this._deck = new CardDeck()
    this._deck.shuffle()
    const playersHands = this._deck.deal()
    this._players = [new Player(name, playersHands[0])]
    this._playerTurn = 1
    this._log = []
    Array.from([1, 2, 3]).forEach((num) => { this._players.push(new Player(Names.name(), playersHands[num])) })
  }

  doTurn(playerRequest) {
    const playerWhoWasAsked = this.findPlayerByName(playerRequest.playerWhoWasAsked);
    const playerWhoAsked = this.findPlayerByName(playerRequest.playerWhoAsked);
    const result = this.cardInPlayerHand(playerWhoWasAsked, playerRequest.desired_rank, playerWhoAsked);
    this.pair();
    this.noCards();
    this._log.unshift(this.book(playerRequest, result))
    return result
  }

  cardInPlayerHand(playerToAsk, rank, playerToGiveCards) {
    if (playerToGiveCards.playerHand().filter(card => card.rank() === rank).length > 0) {
      const cards = playerToAsk.playerHand().filter(card => card.rank() === rank)
      const results = this.playerFindCard(cards, playerToAsk, playerToGiveCards, rank)
      return this.returnValue(results, playerToGiveCards)
    }
  }

  returnValue(results, playerToGiveCards) {
    if (results.length !== 0) {
      return `${results.join(", ")}`
    } else {
      this.nextTurn()
      this.takeCard(playerToGiveCards)
      return "Go fish"
    }
  }

  playerFindCard(cards, playerToAsk, playerToGiveCards, rank) {
    if (cards.length > 0) {
      playerToAsk.removeCardsByRank(rank)
      playerToGiveCards.addCards(cards)
      return cards.map(card => card.value())
    }
    return []
  }

  botTurns() {
    const results = []
    while (this.playerWhoIsPlaying() !== this.player() && this.player().cardsLeft() >= 0) {
      this.botTurn()
    }
    return results
  }

  botTurn() {
    if (this.playerWhoIsPlaying().cardsLeft() > 0) {
      return this.botRequest(this.playerWhoIsPlaying())
    } else {
      this.nextTurn()
      this._log.unshift(`${this.playerWhoIsPlaying().name()} is out of cards`)
    }
  }

  botRequest(player) {
    const [cardToAsk, playerToAsk] = this.randomCardandPlayer(player)
    const playerRequest = { playerWhoWasAsked: playerToAsk.name(), playerWhoAsked: player.name(), desired_rank: cardToAsk.rank() }
    return this.book(playerRequest, this.doTurn(playerRequest))
  }

  randomPlayer() {
    let playerToAsk = this.players()[Math.floor(Math.random() * this.players().length)]
    while (playerToAsk.cardsLeft() === 0 || playerToAsk === this.playerWhoIsPlaying()) {
      playerToAsk = this.players()[Math.floor(Math.random() * this.players().length)]
    }
    return playerToAsk
  }

  randomCardandPlayer(player) {
    return [player.playerHand()[Math.floor(Math.random() * player.playerHand().length)], this.randomPlayer()]
  }

  pair() {
    this.players().forEach((player) => {
      player.pairCards()
    })
  }

  noCards() {
    if (this.deck().hasCards() === true) {
      this.players().filter(pl => pl.cardsLeft() === 0).forEach((player) => {
        this.deck().refill(player)
      })
    }
  }

  book(request, result) {
    if (result === "Go fish") {
      return (`${request.playerWhoAsked} asked ${request.playerWhoWasAsked} for ${new Card(request.desired_rank, 'suit').rankValue()} and went fishing`)
    } else {
      return (`${request.playerWhoAsked} took the ${result} from ${request.playerWhoWasAsked}`)
    }
  }

  nextTurn() {
    if (this.playerTurn() === this.players().length) {
      this._playerTurn = 1
    } else {
      this._playerTurn += 1
    }
  }

  takeCard(player) {
    const card = this.deck().takeCard()
    if (card) {
      player.addCards([card])
    }
  }

  winner() {
    if (this.noCardsLeftInGame() === true) {
      const players = this.players().slice()
      return players.reverse().sort((pl, pl2) => pl.points() - pl2.points()).reverse();
    }
    return false
  }

  noCardsLeftInGame() {
    return (this.players().map(pl => pl.cardsLeft() === 0).filter(boolean => boolean === true).length === 4 && this.deck().hasCards() === false)
  }

  findPlayer(id) {
    return this.players()[id - 1]
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

  findPlayerByName(name) {
    return this.players().filter(pl => pl.name() === name)[0]
  }

  playerWhoIsPlaying() {
    return this.players()[this._playerTurn - 1]
  }

  deck() {
    return this._deck
  }

  log() {
    return this._log
  }
}
