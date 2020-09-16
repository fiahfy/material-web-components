const template = document.createElement('template')
template.innerHTML = `
  <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <i class="material-icons"><slot /></i>
`

class Icon extends HTMLElement {
  static get observedAttributes() {
    return []
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.append(template.content.cloneNode(true))
  }
  connectedCallback() {
    //
  }
  disconnectedCallback() {
    //
  }
  adoptedCallback() {
    //
  }
  attributeChangedCallback() {
    //
  }
}

customElements.define('m-icon', Icon)
