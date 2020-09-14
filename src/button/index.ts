// eslint-disable-next-line
// @ts-ignore
import css from 'bundle-text:./index.scss'

class Button extends HTMLElement {
  static get observedAttributes() {
    return ['outline']
  }
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>${css}</style>
      <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <button class="mdc-button">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label"><slot /></span>
      </button>
    `
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
    const shadow = this.shadowRoot
    const button = shadow?.querySelector('button')
    if (this.getAttribute('outline') === null) {
      button?.classList.remove('mdc-button--outlined')
    } else {
      button?.classList.add('mdc-button--outlined')
    }
  }
}
customElements.define('m-button', Button)
