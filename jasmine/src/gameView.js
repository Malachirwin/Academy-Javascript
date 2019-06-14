class GameView {
  constructor(onload, game, theContainer) {
    this.game = game
    this._onload = onload
    this._targetPlayer = ""
    this._targetCard = ""
    this._log = []
    this.container = theContainer
  }

  selectThePlayer(bot) {
    this._targetPlayer = bot.id
    this.draw()
  }

  selectTheCard(card) {
    this._targetCard = card.name
    this.draw()
  }

  play(event) {
    event.preventDefault()
    const request = { playerWhoWasAsked: this._targetPlayer, playerWhoAsked: this.game.player().name(), desired_rank: this._targetCard }
    this._log.unshift(this.game.book(request, this.game.doTurn(request)))
    this._log.unshift(...this.game.botTurns())
    this.resetAndRender()
  }

  resetAndRender() {
    this._targetPlayer = ""
    this._targetCard = ""
    this.draw()
  }

  displayButton() {
    if (this._targetCard !== "" && this._targetPlayer !== "") {
      const div = document.createElement('div')
      div.onsubmit = this.play.bind(this)
      div.innerHTML = `<form><button type="Submit">Request</button></form>`
      document.querySelector('.player-spot').appendChild(div)
    }
  }

  draw() {
    this.container.innerHTML = ''
    if (this.game.winner() === false) {
      if (this.game.player().cardsLeft() === 0) { this.skipPlayer() }
      this.renderGame()
    } else {
      this._onload(this.game, this.container)
    }
  }

  renderGame() {
    const div = document.createElement(`div`)
    div.classList.add('center')
    this.container.appendChild(div)
    div.innerHTML = this.gameHtml()
    this.addOnClick()
    this.displayButton()
  }

  gameHtml() {
    return `<div class="flex-container">${this.botHtml()}</div>
    <div class="playing-space">${(this.game.deck().hasCards() === true) ? `<img class="card-back" src="public/cards/backs_custom.jpg"/>` : ""}</div>
    ${new PlayerView(this._log, this.game, this.skipPlayer.bind(this.game), this._targetCard).playerHtml()}`
  }

  botHtml() {
    return this.game.players().map((player) => {
      if (this.game.players().indexOf(player) !== 0) {
        const bot = new BotView(player, this._targetPlayer);
        return bot.draw(this._targetPlayer)
      }
    }).join('')
  }

  skipPlayer() {
    this.game.nextTurn()
    this._log.unshift(...this.game.botTurns())
    this.container.innerHTML = ''
    this.draw()
  }

  addOnClick() {
    document.querySelectorAll('.bot').forEach((bot) => {
      bot.onclick = this.selectThePlayer.bind(this, bot)
    })
    document.querySelectorAll('.card-in-hand').forEach((card) => {
      card.onclick = this.selectTheCard.bind(this, card)
    })
  }
}
