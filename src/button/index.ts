import { MDCRipple } from '@material/ripple'
// eslint-disable-next-line
// @ts-ignore
import css from 'bundle-text:./index.scss'

const template = document.createElement('template')
template.innerHTML = `
  <style>${css}</style>
  <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <button class="mdc-button">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label"><slot /></span>
  </button>
`

class Button extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'variant', 'leading-icon', 'trailing-icon']
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
    new MDCRipple(button)
  }
  disconnectedCallback() {
    //
  }
  adoptedCallback() {
    //
  }
  attributeChangedCallback() {
    const button = this.shadowRoot?.querySelector('button')
    if (!button) {
      return
    }
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
    // leading-icon, trailing-icon
    button.querySelectorAll('i').forEach((e) => e.remove())
    const leadingIcon = this.getAttribute('leading-icon')
    if (leadingIcon) {
      const icon = document.createElement('i')
      icon.classList.add('material-icons', 'mdc-button__icon')
      icon.setAttribute('aria-hidden', 'true')
      icon.textContent = leadingIcon
      button.insertBefore(icon, button.querySelector('span'))
    }
    const trailingIcon = this.getAttribute('trailing-icon')
    if (trailingIcon) {
      const icon = document.createElement('i')
      icon.classList.add('material-icons', 'mdc-button__icon')
      icon.setAttribute('aria-hidden', 'true')
      icon.textContent = trailingIcon
      button.append(icon)
    }
  }
}

customElements.define('m-button', Button)
