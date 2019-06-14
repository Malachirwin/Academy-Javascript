class LoginView {
  constructor(onload, container) {
    this._onload = onload
    this.container = container
    this.error = ''
  }

  onSubmit(event) {
    event.preventDefault()
    if (event.target.name.value !== '') {
      this._onload(event.target.name.value)
    } else {
      this.error = "Name can NOT be blank!"
      this.draw()
    }
  }

  draw() {
    this.container.innerHTML = ''
    const div = document.createElement(`div`)
    div.classList.add('center')
    div.innerHTML = this.markup()
    div.setAttribute('id', 'login')
    div.onsubmit = this.onSubmit.bind(this)
    this.container.appendChild(div)
  }

  markup() {
    return `<form>
      ${this.errorHtml()}
      <label for="name">Name</label>
      <input id="name" type="text" name="name" value="" placeholder="Example" autofocus>
      <button type="submit" name="Play">Play</button>
    </form>`
  }

  errorHtml() {
    if (this.error !== '') {
      return `<h1 class="error">${this.error}</h1>`
    }
    return ''
  }

  inputName(name) {
    return document.getElementById('name')
  }

  button() {
    return document.querySelector('button')
  }
}
