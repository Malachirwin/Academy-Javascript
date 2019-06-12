class LoginView {
  constructor(onload) {
    this._onload = onload
  }

  onSubmit(event) {
    event.preventDefault()
    this._onload(event.target.name.value)
  }

  draw(container) {
    const div = document.createElement(`div`)
    const markup = `<form>
      <label for="name">name:</label>
      <input id="name" type="text" name="name" value="" placeholder="Example">
      <button type="submit" name="Play">Play</button>
    </form>`
    div.innerHTML = markup
    div.setAttribute('id', 'login')
    div.onsubmit = this.onSubmit.bind(this)
    container.appendChild(div)
  }

  inputName(name) {
    return document.getElementById('name')
  }

  button() {
    return document.querySelector('button')
  }
}
