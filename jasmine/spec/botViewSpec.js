describe("BotView", () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    card1 = new Card("1", "S")
    card2 = new Card("1", "D")
    card3 = new Card("1", "H")
    card4 = new Card("1", "C")
    player = new Player('Malachi', [card1, card2, card3, card4])
    view = new BotView(player, 'Malachi')
    view.draw('malachi')
  })

  afterEach(() => {
    container.remove()
  })

  it("returns the bot html", () => {
    expect(view.draw('Malachi')).toContain('Malachi')
  });

  it("returns the bot highlighted bot if it is them html", () => {
    expect(view.draw('Malachi')).toContain('highlight-player')
  });
});
