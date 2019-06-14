class GoFishController {
  container() {
    return document.getElementById('main')
  }

  login() {
    const view = new LoginView(this.startGame.bind(this), this.container())
    view.draw()
  }

  startGame(name) {
    const game = new Game(name)
    const view = new GameView(this.endGame.bind(this), game, this.container())
    view.draw()
  }

  endGame(game) {
    const view = new EndGameView(game, this.container(), this.login.bind(this))
    view.draw()
  }
}
window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)
