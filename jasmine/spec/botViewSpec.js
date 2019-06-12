describe("BotView", () => {
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    card1 = new Card("1", "S")
    card2 = new Card("1", "D")
    card3 = new Card("1", "H")
    card4 = new Card("1", "C")
    player = new Player('Malachi', [card1, card2, card3, card4])
    view = new BotView(player)
    view.draw(container)
  })

  it("returns the bot html", () => {
    expect(document.body.textContent).toContain('Malachi')
    container.remove()
  });
});
