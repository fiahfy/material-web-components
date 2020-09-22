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
    this.shadowRoot
      ?.querySelector('slot')
      ?.addEventListener('slotchange', (e) => {
        console.log(e)
        // if (!(e.currentTarget instanceof HTMLSlotElement)) {
        //   return
        // }
        // e.currentTarget.assignedNodes().forEach((node) => {
        //   if (!(node instanceof HTMLElement)) {
        //     return
        //   }
        //   console.log(node)
        //   node.classList.add('mdc-button__icon')
        //   node.setAttribute('aria-hidden', 'true')
        // })
      })
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

customElements.define('m-icon-button', IconButton)
