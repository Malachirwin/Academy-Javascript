class BotView {
  constructor(player, botName) {
    this._player = player
    this._botName = botName
  }

  draw(botName) {
    if (botName === this._player.name()) {
      return this.html('bot highlight-player')
    } else {
      return this.html('bot')
    }
  }

  cardBack() {
    return `<img class="card-back" src="public/cards/backs_custom.jpg"/>`
  }

  html(classes) {
    return `<div id=${this._player.name()} class="${classes}">
        <h3>${this._player.name()}</h3>
        <div class="hand">${this._player.playerHand().map(card => this.cardBack()).join('')}</div>
        <div class="matchesWrapper">${this.matchHtml()}</div>
      </div>`
  }

  matchHtml() {
    return this._player.matches().map(match => `<div class="matches inbetween-match">${match.map(card => `<img class="match" src="${card.toImgPath()}" name="${card.rank()}"/>`).join('')}</div>`).join('')
  }
}
