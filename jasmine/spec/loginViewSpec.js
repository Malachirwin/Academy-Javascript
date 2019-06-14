describe('LoginView', () => {
  it('gets the login html', () => {
    let userName
    const container = document.createElement('div')
    const callback = (name) => { userName = name }
    const view = new LoginView(callback, container);
    document.body.appendChild(container)

    view.draw(container)
    view.inputName().value = 'Malachi'
    view.button().click()

    expect(userName).toEqual('Malachi')
    container.remove()
  });
});
