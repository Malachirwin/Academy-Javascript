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
    const numberOfCardsInHandBefore = 5
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
});
