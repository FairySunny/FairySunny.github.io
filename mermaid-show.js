import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs'

const darkQuery = matchMedia('(prefers-color-scheme: dark)')
let dark

function updateTheme() {
  if (dark != darkQuery.matches) {
    dark = darkQuery.matches
    mermaid.initialize({
      startOnLoad: false,
      suppressErrorRendering: true,
      theme: dark ? 'dark' : 'default'
    })
  }
}

updateTheme()

class MermaidShow extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    this.darkQueryListener = () => this.update()
  }

  async update() {
    updateTheme()

    const source = this.getAttribute('source') || ''
    let svg
    try {
      svg = (await mermaid.render('mermaid', source)).svg
    } catch (e) {
      svg = ''
    }
    this.shadowRoot.innerHTML = svg
  }

  connectedCallback() {
    darkQuery.addEventListener('change', this.darkQueryListener)
  }

  disconnectedCallback() {
    darkQuery.removeEventListener('change', this.darkQueryListener)
  }

  attributeChangedCallback() {
    this.update()
  }

  static observedAttributes = ['source']
}

customElements.define('mermaid-show', MermaidShow)
