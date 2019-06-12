class BotView {
  constructor(player, botName) {
    this._player = player
    this._botName = botName
  }

  draw(container, botName) {
    const div = document.createElement(`div`)
    let markup
    if (botName === this._player.name()) {
      markup = `<div id=${this._player.name()} class="bot highlight-player"><h3>${this._player.name()}</h3><div class="hand">${this._player.playerHand().map(card => this.cardBack()).join('')}</div></div>`
    } else {
      markup = `<div id=${this._player.name()} class="bot"><h3>${this._player.name()}</h3><div class="hand">${this._player.playerHand().map(card => this.cardBack()).join('')}</div></div>`
    }
    div.innerHTML = markup
    container.appendChild(div)
  }

  cardBack() {
    return `<img class="card-back" src="public/cards/backs_custom.jpg"/>`
  }
}
