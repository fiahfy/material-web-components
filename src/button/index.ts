import { MDCRipple } from '@material/ripple'
// eslint-disable-next-line
// @ts-ignore
import css from 'bundle-text:./index.scss'

class Button extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'variant']
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
    const shadow = this.shadowRoot
    const button = shadow?.querySelector('button')
    button && new MDCRipple(button)
  }
  disconnectedCallback() {
    //
  }
  adoptedCallback() {
    //
  }
  attributeChangedCallback() {
    const shadow = this.shadowRoot
    const button = shadow!.querySelector('button')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
    // disabled
    button.disabled = this.getAttribute('disabled') !== null
    // variant
    switch (this.getAttribute('variant')) {
      case 'outlined':
        button.classList.add('mdc-button--outlined')
        button.classList.remove('mdc-button--raised')
        button.classList.remove('mdc-button--unelevated')
        break
      case 'raised':
        button.classList.remove('mdc-button--outlined')
        button.classList.add('mdc-button--raised')
        button.classList.remove('mdc-button--unelevated')
        break
      case 'unelevated':
        button.classList.remove('mdc-button--outlined')
        button.classList.remove('mdc-button--raised')
        button.classList.add('mdc-button--unelevated')
        break
      case 'text':
      default:
        button.classList.remove('mdc-button--outlined')
        button.classList.remove('mdc-button--raised')
        button.classList.remove('mdc-button--unelevated')
        break
    }
  }
}
customElements.define('m-button', Button)
