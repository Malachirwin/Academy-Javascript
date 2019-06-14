// const cards = player.playerHand().filter(card => this.log().map(l => l.includes(card.rank()))[0])
// debugger
// if (cards.length > 0) {
//   let player2 = player
//   cards.forEach((card) => {
//     if (player2 !== player) {
//       const log = this.log().filter(l => l.includes(card.rank()))[0]
//       player2 = this.findPlayerByName(log.match(/^([\w\-]+)/))
//       return [card, player2]
//     }
//   })
//   if (player2 !== player) {
//     const log = this.log().filter(l => l.includes(cards[0].rank()))[0]
//     return [cards[0], player2]
//   }
// }
