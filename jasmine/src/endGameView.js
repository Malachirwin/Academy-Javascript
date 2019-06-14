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
    this.container.appendChild(div)
    div.innerHTML = this.playerPointsHtml()
    this.joinButton(div)
  }

  joinButton(parentDiv) {
    const div = document.createElement(`div`)
    div.innerHTML = `<form><button type="submit">Rejoin</button></form>`
    div.onsubmit = this.onload.bind(this)
    parentDiv.appendChild(div)
  }

  playerPointsHtml() {
    const players = this.game.winner()
    const winners = players.filter(player => players[0].points() === player.points())
    const others = players.filter(pl => !winners.includes(pl))
    return [this.winnerClanHtml(winners), others.map(pl => `<h3>${pl.name()} had ${pl.points()} point(s)</h3>`).join('')].join('')
  }

  winnerClanHtml(players) {
    if (players.length === 1) {
      return `<h1>${players[0].name()} won with ${players[0].points()} points</h1>`
    } else if (players.length === 2) {
      return `<h1>${players.map(pl => pl.name()).join(' and ')} tied with ${players[0].points()} points</h1>`
    }
    return `<h1>${players[0].name()}, ${players[1].name()}, and ${players[2].name()} tied with ${players[0].points()} points</h1>`
  }
}
