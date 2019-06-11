class GameView {
  constructor(game) {
    this._game = game
  }

  game() {
    return this._game
  }

  draw(container) {
    const div = document.createElement(`div`)
    const playerNames = this.game().players().map(pl => pl.name())
    const cardHtml = this.game().player().playerHand().map(card => `<img class="card-in-hand" src="${card.toImgPath()}" />`)
    const cardBack = `<img class="card-back" src="public/cards/backs_custom.jpg"/>`
    const bots = [1, 2, 3].map(num => `<div class="bot"><h3>${this.game().players()[num].name()}</h3><div class="hand">${this.game().players()[num].playerHand().map(card => cardBack).join('')}</div></div>`)

    const markup = `
      <div class="center">
        <h1>Go Fish</h1>
        <div class="flex-container">${bots.join('')}</div>
        <div class="playing-space">${cardBack}</div>
        <div class="player-spot">
          <h1 class="player-name">${this.game().player().name()}</h1>
          <div class="hand">${cardHtml.join('')}</div>
        </div>
      </div>
    `
    div.innerHTML = markup
    container.appendChild(div)
  }
}
