class GameView {
  constructor(game) {
    this._game = game
    this._targetPlayer = ""
    this._targetCard = ""
    this._showingButton = false
    this._log = []
  }

  game() {
    return this._game
  }

  selectThePlayer(bot) {
    const player = this.game().players()[bot.id]
    if (document.querySelector('.highlight-player') !== null) {
      document.querySelector('.highlight-player').classList.remove("highlight-player")
    }
    this._targetPlayer = player.name()
    bot.classList.add("highlight-player")
    this.displayButton()
  }

  selectTheCard(card) {
    document.querySelectorAll('.highlight').forEach((highLighted) => {
      highLighted.classList.remove("highlight")
    })
    document.querySelectorAll('.card-in-hand').forEach((card2) => {
      if (card2.name === card.name) { card2.classList.add("highlight") }
    })
    this._targetCard = card.name
    card.classList.add("highlight")
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
    this.render(document.getElementById('main'))
    this._targetPlayer = ""
    this._targetCard = ""
    this._showingButton = false
  }

  displayButton() {
    if (this._showingButton === false && this._targetCard !== "" && this._targetPlayer !== "") {
      const div = document.createElement('div')
      const button = `<form><button type="Submit">Request</button></form>`
      div.onsubmit = this.play.bind(this)
      div.innerHTML = button
      const playerSpot = document.querySelector('.player-spot')
      playerSpot.appendChild(div)
      this._showingButton = true
    }
  }

  draw(container) {
    this.render(container)
  }

  render(container) {
    const temp = document.getElementById("temp")
    if (temp !== null) { temp.remove() }
    const div = document.createElement(`div`)
    div.id = "temp"
    const playerNames = this.game().players().map(pl => pl.name())
    const cardHtml = this.game().player().playerHand().map(card => `<img class="card-in-hand" src="${card.toImgPath()}" name="${card.rank()}"/>`)
    const cardBack = `<img class="card-back" src="public/cards/backs_custom.jpg"/>`
    const bots = [1, 2, 3].map(num => `<div id=${num} class="bot"><h3>${this.game().players()[num].name()}</h3><div class="hand">${this.game().players()[num].playerHand().map(card => cardBack).join('')}</div></div>`)
    const logs = this._log.reverse().map(log => `<h4 class="book">${log}</h4>`)

    const markup = `
      <div class="center">
        <h1>Go Fish</h1>
        <div class="flex-container">${bots.join('')}</div>
        <div class="playing-space">${(this.game().deck().hasCards() === true) ? cardBack : ""}</div>
        <div class="player-spot"> :
          <div class="log"><h4 class="book">Logs</h4>${logs.join('')}</div>
          <h1 class="player-name">${this.game().player().name()}</h1>
          <div class="hand">${cardHtml.join('')}</div>
        </div>
      </div>
    `
    div.innerHTML = markup
    container.appendChild(div)
    this.addOnClick()
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
