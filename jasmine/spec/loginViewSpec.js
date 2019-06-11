describe('LoginView', () => {
  it('gets the login html', () => {
    let userName
    const callback = (name) => { userName = name }
    const view = new LoginView(callback);
    const container = document.createElement('div')
    document.body.appendChild(container)

    view.draw(container)
    view.inputName().value = 'Malachi'
    view.button().click()

    expect(userName).toEqual('Malachi')
    container.remove()
  });
});
