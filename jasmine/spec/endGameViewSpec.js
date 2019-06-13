describe('EndGameView', () => {
  beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
    game = new Game("Malachi")
    game.player().setHand([new Card('6', 'H'), new Card('6', 'S'), new Card('6', 'D'), new Card('6', 'C'), new Card('3', 'H'), new Card('3', 'S'), new Card('3', 'D'), new Card('3', 'C')])
    game.pair()
    game.removeAllCardsFromDeck()
    game.players()[1].setHand([])
    game.players()[2].setHand([])
    game.players()[3].setHand([])
    function callBack() {
      return "Welcome to you're new game"
    }
    view = new EndGameView(game, div, callBack.bind(this))
    view.draw(div)
  })

  afterEach(() => {
    div.remove()
  })

  it('has your name with the number of points', () => {
    expect(document.body.textContent).toContain(`Malachi won with 2 points`) 
  })
})
