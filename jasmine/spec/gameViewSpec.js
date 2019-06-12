describe('GameView', () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    game = new Game("Malachi")
    view = new GameView(game)
    view.draw(container)
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
});
