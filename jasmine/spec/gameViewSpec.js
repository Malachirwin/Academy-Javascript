describe('GameView', () => {
  it('gets the game html', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    function startGame(name) {
      const game = new Game(name)
      const view = new GameView(game)
      view.draw(container)
    }
    const view = new LoginView(startGame);


    view.draw(container)
    view.inputName().value = 'Malachi'
    view.button().click()

    expect(document.body.textContent).toContain('Malachi')
    container.remove()
  });
});
