// @see https://github.com/material-components/material-components-web/tree/master/packages/mdc-button
// @see https://m2.material.io/components/buttons/web
import { MDCRipple } from '@material/ripple'
// eslint-disable-next-line
// @ts-ignore
import css from 'bundle-text:./index.scss'

const template = document.createElement('template')
template.innerHTML = `
  <style>${css}</style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <button class="mdc-button">
    <span class="mdc-button__ripple"></span>
    <span class="mdc-button__focus-ring"></span>
    <span class="mdc-button__label"><slot /></span>
  </button>
`

class Button extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'variant', 'icon']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.append(template.content.cloneNode(true))
  }
  connectedCallback() {
    const button = this.shadowRoot?.querySelector('.mdc-button')
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
    const button =
      this.shadowRoot?.querySelector<HTMLButtonElement>('.mdc-button')
    if (!button) {
      return
    }
    // disabled
    button.disabled = this.getAttribute('disabled') !== null
    // variant
    button.classList.remove('mdc-button--outlined')
    button.classList.remove('mdc-button--raised')
    button.classList.remove('mdc-button--unelevated')
    switch (this.getAttribute('variant')) {
      case 'outlined':
        button.classList.add('mdc-button--outlined')
        break
      case 'raised':
        button.classList.add('mdc-button--raised')
        break
      case 'unelevated':
        button.classList.add('mdc-button--unelevated')
        break
      case 'text':
      default:
        break
    }
    // icon
    button.classList.remove('mdc-button--icon-leading')
    button.querySelector('i')?.remove()
    const icon = this.getAttribute('icon')
    if (icon) {
      button.classList.add('mdc-button--icon-leading')
      const i = document.createElement('i')
      i.classList.add('material-icons', 'mdc-button__icon')
      i.setAttribute('aria-hidden', 'true')
      i.textContent = icon
      button.insertBefore(i, button.querySelector('.mdc-button__label'))
    }
  }
}

customElements.define('m-button', Button)
