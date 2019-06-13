class EndGameView {
  constructor(game, container, onload) {
    this.game = game
    this.onload = onload
    this.container = container
    this.container.innerHTML = ''
  }

  draw(container) {
    this.container.innerHTML = ''
    const div = document.createElement(`div`)
    div.classList.add('center')
    container.appendChild(div)
    div.innerHTML = this.playerPointHtml()
    this.joinButton(div)
  }

  joinButton(parentDiv) {
    const div = document.createElement(`div`)
    div.innerHTML = `<form><button type="submit">Rejoin</button></form>`
    div.onsubmit = this.onload.bind(this)
    parentDiv.appendChild(div)
  }

  playerPointHtml() {
    const players = this.game.winner()
    return players.map((pl) => {
      if (players.indexOf(pl) === 0) {
        return `<h1>${pl.name()} won with ${pl.points()} points</h1>`
      }
      return `<h3>${pl.name()} had ${pl.points()} point(s)</h3>`
    }).join('')
  }
}
