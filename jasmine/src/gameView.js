class GameView {
  constructor(game, theContainer) {
    this.game = game
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
    while (this._log.length > 20) {
      this._log.pop()
    }
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
    if (this.game.winner() === false) {
      this.renderGame()
    } else {
      this.container.innerHTML = ''
      const div = document.createElement(`div`)
      div.classList.add('center')
      const markup = `<h1>${this.game.winner()}</h1>`
      this.container.appendChild(div)
      div.innerHTML = markup
    }
  }

  renderGame() {
    this.container.innerHTML = ''
    const div = document.createElement(`div`)
    div.classList.add('center')
    const markup = `
        <h1>Go Fish</h1>
        <div class="flex-container">${this.botHtml()}</div>
        <div class="playing-space">${(this.game.deck().hasCards() === true) ? `<img class="card-back" src="public/cards/backs_custom.jpg"/>` : ""}</div>
        <div class="player-spot">
          <div class="log"><h4 class="book">Logs</h4>${this.logs()}</div>
          <h1 class="player-name">${this.game.player().name()}</h1>
          <div class="hand">${this.cardHtml(div)}</div>
          <div class="matchesWrapper">${this.matchHtml()}</div>
        </div>`
    this.container.appendChild(div)
    div.innerHTML = markup
    this.cardHtml(div)
    this.addOnClick()
    this.displayButton()
  }

  botHtml() {
    // eslint-disable-next-line array-callback-return
    return this.game.players().map((player) => {
      if (this.game.players().indexOf(player) !== 0) {
        const bot = new BotView(player, this._targetPlayer);
        return bot.draw(this._targetPlayer)
      }
    }).join('')
  }

  renderSkipButton(container) {
    const div = document.createElement('div')
    div.onclick = this.skipPlayer()
    div.innerHTML = `<button>Play Next Round</button>`
    container.appendChild(div)
  }

  skipPlayer() {
    this.game.nextTurn()
    this._log.unshift(...this.game.botTurns())
    this.draw()
  }

  cardHtml(div) {
    if (this.game.player().cardsLeft() === 0) {
      this.renderSkipButton(div)
    }
    return this.game.player().playerHand().map((card) => {
      if (card.rank() === this._targetCard) {
        return `<img class="card-in-hand highlight" src="${card.toImgPath()}" name="${card.rank()}"/>`
      } else {
        return `<img class="card-in-hand" src="${card.toImgPath()}" name="${card.rank()}"/>`
      }
    }).join('')
  }

  matchHtml() {
    return this.game.player().matches().map(match => `<div class="matches inbetween-match">${match.map(card => `<img class="match" src="${card.toImgPath()}" name="${card.rank()}"/>`).join('')}</div>`).join('')
  }

  logs() {
    return this._log.map(log => `<h4 class="book">${log}</h4>`).join('')
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
