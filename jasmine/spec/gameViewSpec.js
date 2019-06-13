describe('GameView', () => {
  beforeEach(() => {
    container = document.createElement('div')
    container.id = "main"
    document.body.appendChild(container)
    game = new Game("Malachi")
    view = new GameView(game, container)
    view.draw()
  });

  it('gets the game html', () => {
    expect(document.body.textContent).toContain('Malachi')
    container.remove()
  });

  it('gets the game html and makes 21 cards 20 in the four hands and 1 in the pile', () => {
    const botCards = 5, playerCards = 5, centerPile = 1;
    expect(document.querySelectorAll('img').length).toEqual((botCards * 3) + playerCards + centerPile)
    container.remove()
  });

  it('clicks a card and highlights it', () => {
    card = document.querySelector('.card-in-hand')
    card.click()
    expect(document.querySelector('.card-in-hand').classList).toContain('highlight')
    container.remove()
  });

  it('clicks a bot and highlights it', () => {
    bot = document.querySelector('.bot')
    bot.click()
    expect(document.querySelector('.bot').classList).toContain('highlight-player')
    container.remove()
  });

  it("requests a card", () => {
    game.players()[0].setHand([new Card('5', 'H'), new Card('A', 'S'), new Card('6', 'D'), new Card('J', 'C')])
    game.players()[1].setHand([new Card('5', 'D'), new Card('4', 'S'), new Card('7', 'D'), new Card('K', 'C')])
    game.players()[2].setHand([new Card('15', 'H'), new Card('2', 'S'), new Card('20', 'D'), new Card('EK', 'C')])
    game.players()[3].setHand([new Card('42', 'H'), new Card('32', 'S'), new Card('87', 'D'), new Card('62', 'C')])
    view.draw()
    const numberOfCardsInHandBefore = 4
    expect(document.querySelectorAll('.card-in-hand').length).toEqual(numberOfCardsInHandBefore)
    document.querySelector('.card-in-hand').click()
    document.querySelector('.bot').click()
    const button = document.querySelector('button')
    expect(button.textContent).toContain('Request')
    button.click()
    expect(document.querySelector('button')).toEqual(null)
    expect(document.querySelectorAll('.card-in-hand').length).toBeGreaterThan(numberOfCardsInHandBefore)
    container.remove()
  });

  it("has a game log", () => {
    expect(document.body.textContent).toContain('Log')
    container.remove()
  });

  it('Have Matches', () => {
    game.player().match([new Card("A", "C"), new Card("A", "H"), new Card("A", "D"), new Card("A", "S")])
    view.draw()
    expect(document.querySelectorAll('.matches').length).toEqual(1)
    container.remove()
  })
});
