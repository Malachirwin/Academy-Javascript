class PlayerView {
  constructor(logs, game, skipPlayer, targetCard) {
    this._log = logs
    this.game = game
    this._targetCard = targetCard
    this.skipPlayerFunction = skipPlayer
  }

  playerHtml() {
    return `<div class="player-spot">
    <div class="log"><h4 class="book">Logs</h4>${this.logs()}</div>
    <h1 class="player-name">${this.game.player().name()}</h1>
    <div class="hand">${this.cardHtml(this.game)}</div>
    <div class="matchesWrapper">${this.matchHtml(this.game)}</div>
  </div>`
  }

  cardHtml(game) {
    if (game.player().cardsLeft() === 0) {
      this.skipPlayerFunction()
    }
    return this.theCardHtml(game.player())
  }

  theCardHtml(player) {
    return player.playerHand().map((card) => {
      if (card.rank() === this._targetCard) {
        return `<img class="card-in-hand highlight" src="${card.toImgPath()}" name="${card.rank()}"/>`
      } else {
        return `<img class="card-in-hand" src="${card.toImgPath()}" name="${card.rank()}"/>`
      }
    }).join('')
  }

  matchHtml(game) {
    return this.game.player().matches().map(match => `<div class="matches inbetween-match">${match.map(card => `<img class="match" src="${card.toImgPath()}" name="${card.rank()}"/>`).join('')}</div>`).join('')
  }

  logs() {
    return this._log.slice(0, 20).map(log => `<h4 class="book">${log}</h4>`).join('')
  }
}
