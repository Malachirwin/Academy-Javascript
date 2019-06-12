describe('Player', () => {
  it("returns a player's name", () => {
    const player = new Player('Malachi')
    expect(player.name()).toEqual('Malachi')
  });

  it("returns a player's cards", () => {
    const card1 = new Card("A", "S")
    const card2 = new Card("2", "D")
    const player = new Player('Malachi', [card1, card2])
    expect(player.playerHand()).toEqual([card1, card2])
  });

  it("adds cards to a playerHand", () => {
    const card1 = new Card("A", "S")
    const card2 = new Card("2", "D")
    const player = new Player('Malachi')
    player.addCards([card1, card2])
    expect(player.playerHand()).toEqual([card1, card2])
  });

  it("has matches", () => {
    const card1 = new Card("1", "S")
    const card2 = new Card("1", "D")
    const card3 = new Card("1", "H")
    const card4 = new Card("1", "C")
    const player = new Player('Malachi', [card1, card2, card3, card4])
    expect(player.matches()).toEqual([])
    expect(player.points()).toEqual(0)
    player.pairCards()
    expect(player.matches()).toEqual([[card1, card2, card3, card4]])
    expect(player.points()).toEqual(1)
  });

  it("returns how many cards are left in the hand", () => {
    const card1 = new Card("A", "S")
    const card2 = new Card("2", "D")
    const player = new Player('Malachi', [card1, card2])
    expect(player.cardsLeft()).toEqual(2);
  });
});
