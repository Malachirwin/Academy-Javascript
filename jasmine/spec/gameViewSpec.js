describe('GameView', () => {
  beforeEach(() => {
    container = document.createElement('div')
    container.id = "main"
    document.body.appendChild(container)
    function callBack() {
      return "Game Over"
    }
    game = new Game("Malachi")
    view = new GameView(callBack.bind(this), game, container)
    view.draw()
  });

  afterEach(() => {
    container.remove()
  })

  it('gets the game html', () => {
    expect(document.body.textContent).toContain('Malachi')
  });

  it('gets the game html and makes 21 cards 20 in the four hands and 1 in the pile', () => {
    const botCards = 5, playerCards = 5, centerPile = 1;
    expect(document.querySelectorAll('img').length).toEqual((botCards * 3) + playerCards + centerPile)
  });

  it('clicks a card and highlights it', () => {
    card = document.querySelector('.card-in-hand')
    card.click()
    expect(document.querySelector('.card-in-hand').classList).toContain('highlight')
  });

  it('clicks a bot and highlights it', () => {
    bot = document.querySelector('.bot')
    bot.click()
    expect(document.querySelector('.bot').classList).toContain('highlight-player')
  });

  it("requests a card", () => {
    game.players()[0].setHand([new Card('5', 'H')])
    game.players()[1].setHand([new Card('5', 'D'), new Card('4', 'S')])
    game.players()[2].setHand([new Card('6', 'H')])
    game.players()[3].setHand([new Card('2', 'H')])
    view.draw()
    const numberOfCardsInHandBefore = 1
    expect(document.querySelectorAll('.card-in-hand').length).toEqual(numberOfCardsInHandBefore)
    document.querySelector('.card-in-hand').click()
    document.querySelector('.bot').click()
    const button = document.querySelector('button')
    expect(button.textContent).toContain('Request')
    button.click()
    expect(document.querySelector('button')).toEqual(null)
    expect(document.querySelectorAll('.card-in-hand').length).toBeGreaterThan(numberOfCardsInHandBefore)
  });

  it("has a game log", () => {
    expect(document.body.textContent).toContain('Log')
  });

  it('Have Matches', () => {
    game.player().match([new Card("A", "C"), new Card("A", "H"), new Card("A", "D"), new Card("A", "S")])
    view.draw()
    expect(document.querySelectorAll('.matches').length).toEqual(1)
  })
});
