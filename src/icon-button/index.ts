import { MDCRipple } from '@material/ripple'
// eslint-disable-next-line
// @ts-ignore
import css from 'bundle-text:./index.scss'

const template = document.createElement('template')
template.innerHTML = `
  <style>${css}</style>
  <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <button class="material-icons mdc-icon-button"><slot /></button>
`

class IconButton extends HTMLElement {
  static get observedAttributes() {
    return []
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.append(template.content.cloneNode(true))
  }
  connectedCallback() {
    const button = this.shadowRoot?.querySelector('button')
    if (!button) {
      return
    }
    const ripple = new MDCRipple(button)
    ripple.unbounded = true
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

customElements.define('m-icon-button', IconButton)
