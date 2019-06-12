describe("BotView", () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    player = new Player('Malachi', [card1, card2, card3, card4])
    view = new BotView(player)
    view.draw(container)
  })

  it("returns the bot html", () => {
    expect('').toEqual('')
  });
});
