describe("Game", () => {
  beforeEach(() => {
    game = new Game('Malachi')
    player1 = game.findPlayer(1)
    player2 = game.findPlayer(2)
    player3 = game.findPlayer(3)
    player4 = game.findPlayer(4)
    playerTurn = game.playerTurn()
  })
  it("creates a game with four players", () => {
    expect(game.players().length).toEqual(4)
  })

  it("sees if a player has a match of four cards", () => {
    player1.setHand([new Card('3', 'H'), new Card('3', 'S'), new Card('3', 'D'), new Card('3', 'C')])
    player2.setHand([new Card('4', 'H'), new Card('4', 'S'), new Card('4', 'D'), new Card('4', 'C')])
    game.pair()
    expect(player1.cardsLeft()).toEqual(0)
    expect(player2.cardsLeft()).toEqual(0)
  })

  it('compares a card two a players hand and return true', () => {
    player1.setHand([new Card('3', 'H'), new Card('3', 'D'), new Card('7', 'H'), new Card('4', 'H'), new Card('2', 'S')])
    player2.setHand([new Card('3', 'H')])
    expect(game.cardInPlayerHand(player1, '3', player2)).toEqual("3 of Hearts, 3 of Diamonds")
    expect(player1.cardsLeft()).toEqual(3)
    expect(player2.cardsLeft()).toEqual(3)
  })

  it("compares a card two a players hand and return Go fish and player draws a card", () => {
    player2.setHand([new Card("3", 'H'), new Card('7', 'H'), new Card('4', 'H'), new Card('9', 'H'), new Card('6', 'D')])
    player3.setHand([new Card("J", "H")])
    expect(game.cardInPlayerHand(player2, "J", player3)).toEqual("Go fish")
    expect(player2.cardsLeft()).toEqual(5)
    expect(player3.cardsLeft()).toEqual(2)
  })

  it("returns player if all players do not have any cards", () => {
    expect(game.winner()).toEqual(false)
    player2.setHand([new Card('3', 'H'), new Card('3', 'S'), new Card('3', 'D'), new Card('3', 'C')])
    game.pair()
    player2.setHand([new Card('6', 'H'), new Card('6', 'S'), new Card('6', 'D'), new Card('6', 'C')])
    game.pair()
    game.deck().removeAllCardsFromDeck()
    player1.setHand([])
    player3.setHand([])
    player4.setHand([])
    expect(JSON.stringify(game.winner())).toEqual(JSON.stringify([player2, player1, player3, player4]))
  })

  it("gives five cards to a player if they run out of cards", () => {
    player4.setHand([new Card('3', 'D')])
    player3.setHand([new Card('3', "H")])
    playerRequest = { playerWhoWasAsked: player4.name(), playerWhoAsked: player3.name(), desired_rank: '3' }
    expect(game.doTurn(playerRequest)).toEqual("3 of Diamonds")
    expect(player4.cardsLeft()).toEqual(5)
    expect(player3.cardsLeft()).toEqual(2)
  })

  it("play around and can play bot turns", () => {
    game.deck().removeAllCardsFromDeck()
    player1.setHand([new Card('3', 'S'), new Card('4', 'S')])
    player2.setHand([new Card('3', 'D')])
    player3.setHand([])
    player4.setHand([])
    game.nextTurn()
    expect(game.botTurn()).toEqual(`${player2.name()} took the 3 of Spades from ${player1.name()}`)
  })
})
