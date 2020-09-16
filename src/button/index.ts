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
    <slot name="leading-icon"></slot>
    <span class="mdc-button__label"><slot /></span>
  </button>
`

class Button extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'variant']
  }
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.append(template.content.cloneNode(true))
    this.shadowRoot
      ?.querySelector('slot')
      ?.addEventListener('slotchange', (e) => {
        console.log(e)
        if (!(e.currentTarget instanceof HTMLSlotElement)) {
          return
        }
        e.currentTarget.assignedNodes().forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return
          }
          console.log(node)
          node.classList.add('mdc-button__icon')
          node.setAttribute('aria-hidden', 'true')
        })
      })
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
  }
}

customElements.define('m-button', Button)
