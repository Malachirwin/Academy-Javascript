describe('EndGameView', () => {
  beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
    game = new Game("Malachi")
    game.player().setHand([new Card('6', 'H'), new Card('6', 'S'), new Card('6', 'D'), new Card('6', 'C'), new Card('3', 'H'), new Card('3', 'S'), new Card('3', 'D'), new Card('3', 'C')])
    game.players()[1].setHand([new Card('6', 'H'), new Card('6', 'S'), new Card('6', 'D'), new Card('6', 'C')])
    game.pair()
    game.removeAllCardsFromDeck()
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

  it('has other players points', () => {
    expect(document.body.textContent).toContain(`${game.players()[1].name()} had 1 point(s)`)
  })

  it('shows ties', () => {
    div.innerHtml = ''
    game.players()[1].match([new Card('A', 'H'), new Card('A', 'S'), new Card('A', 'D'), new Card('A', 'C')])
    view.draw(div)
    expect(document.body.textContent).toContain(`${game.players()[0].name()} and ${game.players()[1].name()} tied with 2 points`)
  })

  it('shows three way ties', () => {
    div.innerHtml = ''
    game.players()[1].match([new Card('A', 'H'), new Card('A', 'S'), new Card('A', 'D'), new Card('A', 'C')])
    game.players()[2].match([new Card('9', 'H'), new Card('9', 'S'), new Card('9', 'D'), new Card('9', 'C')])
    game.players()[2].match([new Card('K', 'H'), new Card('K', 'S'), new Card('K', 'D'), new Card('K', 'C')])
    view.draw(div)
    expect(document.body.textContent).toContain(`${game.players()[0].name()}, ${game.players()[1].name()}, and ${game.players()[2].name()} tied with 2 points`)
  })
})
