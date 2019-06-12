class GameView {
  constructor(game) {
    this._game = game
    this._targetPlayer = ""
    this._targetCard = ""
    this._log = []
  }

  game() {
    return this._game
  }

  selectThePlayer(bot) {
    this._targetPlayer = bot.id
    this.draw(this.container)
    this.displayButton()
  }

  selectTheCard(card) {
    this._targetCard = card.name
    this.draw(this.container)
    this.displayButton()
  }

  play(event) {
    event.preventDefault()
    const request = { playerWhoWasAsked: this._targetPlayer, playerWhoAsked: this.game().player().name(), desired_rank: this._targetCard }
    const result = this.game().doTurn(request)
    if (result === "Go fish") {
      this._log.push(`${this._targetPlayer} said ${result} to ${this.game().player().name()}`)
    } else {
      this._log.push(`${this.game().player().name()} took the ${result} from ${this._targetPlayer}`)
    }
    this.resetAndRender()
  }

  resetAndRender() {
    this._targetPlayer = ""
    this._targetCard = ""
    this.draw(this.container)
  }

  displayButton() {
    if (this._targetCard !== "" && this._targetPlayer !== "") {
      const div = document.createElement('div')
      const button = `<form><button type="Submit">Request</button></form>`
      div.onsubmit = this.play.bind(this)
      div.innerHTML = button
      const playerSpot = document.querySelector('.player-spot')
      playerSpot.appendChild(div)
    }
  }

  draw(container) {
    container.innerHTML = ''
    const div = document.createElement(`div`)
    const markup = `
      <div class="center">
        <h1>Go Fish</h1>
        <div class="Bots"></div>
        <div class="playing-space">${(this.game().deck().hasCards() === true) ? this.cardBack() : ""}</div>
        <div class="player-spot"> :
          <div class="log"><h4 class="book">Logs</h4>${this.logs().join('')}</div>
          <h1 class="player-name">${this.game().player().name()}</h1>
          <div class="hand">${this.cardHtml().join('')}</div>
        </div>
      </div>`
    container.appendChild(div)
    div.innerHTML = markup
    document.querySelector('.Bots').appendChild(this.botHtml())
    this.addOnClick()
    this.container = container
  }

  botHtml() {
    const botDiv = document.createElement('div')
    botDiv.classList.add('flex-container')
    this.game().players().forEach((player) => {
      if (this.game().players().indexOf(player) !== 0) {
        const bot = new BotView(player, this._targetPlayer);
        bot.draw(botDiv, this._targetPlayer)
      }
    })
    return botDiv
  }

  cardHtml() {
    return this.game().player().playerHand().map((card) => {
      if (card.rank() === this._targetCard) {
        return `<img class="card-in-hand highlight" src="${card.toImgPath()}" name="${card.rank()}"/>`
      } else {
        return `<img class="card-in-hand" src="${card.toImgPath()}" name="${card.rank()}"/>`
      }
    })
  }

  cardBack() {
    return `<img class="card-back" src="public/cards/backs_custom.jpg"/>`
  }

  bots() {
    return [1, 2, 3].map(num => `<div id=${num} class="bot"><h3>${this.game().players()[num].name()}</h3><div class="hand">${this.game().players()[num].playerHand().map(card => this.cardBack()).join('')}</div></div>`)
  }

  logs() {
    return this._log.reverse().map(log => `<h4 class="book">${log}</h4>`)
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
