describe('PlayerView', () => {
  beforeEach(() => {
    container = document.createElement('div')
    container.id = "main"
    document.body.appendChild(container)
    callback = () => 'Your turn was skipped'
    game = new Game('Malachi')
    game.player().setHand([new Card('3', 'H'), new Card('3', 'D'), new Card('7', 'H'), new Card('4', 'H'), new Card('2', 'S')])
    game.player().match([new Card('3', 'H'), new Card('3', 'D'), new Card('3', 'C'), new Card('3', 'S')])
    view = new PlayerView(['Player 1 took a the Jack of Spades from Player 4'], game, callback.bind(this), '3')
  })

  it('returns player html', () => {
    expect(view.playerHtml()).toContain(game.player().name())
  })

  it('has a game log', () => {
    expect(view.playerHtml()).toContain('class="log"')
    expect(view.playerHtml()).toContain('Player 1 took a the Jack of Spades from Player 4')
  })

  it('has cards', () => {
    const numOfCardsWhenYouStart = 5
    expect(view.playerHtml().match(/card-in-hand/g).length).toEqual(numOfCardsWhenYouStart)
  })

  it('highlights all cards of the target rank', () => {
    const multipleCardsHighlighted = 2
    expect(view.playerHtml().match(/highlight/g).length).toEqual(multipleCardsHighlighted)
  })

  it('has matches', () => {
    expect(view.playerHtml().match(/matches/).length).toEqual(1)
  })
})
