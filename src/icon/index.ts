class Icon extends HTMLElement {
  static get observedAttributes() {
    return []
  }
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <i class="material-icons">add</i>
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
    //
  }
}
customElements.define('m-icon', Icon)
