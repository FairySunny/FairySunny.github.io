import * as marked from 'https://cdn.jsdelivr.net/npm/marked@15.0.4/lib/marked.esm.js'
import { gfmHeadingId } from 'https://cdn.jsdelivr.net/npm/marked-gfm-heading-id@4.1.1/+esm'
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/dist/purify.es.mjs'
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.0/build/es/highlight.min.js'
import renderMathInElement from 'https://cdn.jsdelivr.net/npm/katex@0.16.15/dist/contrib/auto-render.mjs'

async function importMermaid() {
  return (await import('https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs')).default
}

marked.use({ silent: true, breaks: true })
marked.use(gfmHeadingId())

function render(markdown, sanitize) {
  const markdownEl = document.createElement('p')
  markdownEl.className = 'markdown-body'

  let html = marked.parse(markdown)
  if (sanitize) {
    html = DOMPurify.sanitize(html)
  }
  markdownEl.innerHTML = html

  markdownEl.querySelectorAll('pre code').forEach(codeEl => {
    const language = (codeEl.classList[0] || '').match(/^language-(.+)/)?.[1]
    if (hljs.getLanguage(language)) {
      codeEl.innerHTML = hljs.highlight(codeEl.textContent || '', { language, ignoreIllegals: true }).value
    }
  })

  renderMathInElement(markdownEl, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ],
    throwOnError: false,
    strict: false
  })

  markdownEl.querySelectorAll('pre > code.language-mermaid').forEach(codeEl => {
    const preEl = codeEl.parentElement
    if (!preEl) return
    preEl.textContent = codeEl.textContent
    preEl.className = 'mermaid'
  })
  const mermaidEls = markdownEl.querySelectorAll('pre.mermaid')
  if (mermaidEls.length) {
    importMermaid().then(mermaid => {
      const dark = matchMedia('(prefers-color-scheme: dark)').matches
      if (mermaid.dark != dark) {
        mermaid.dark = dark
        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: dark ? 'dark' : 'default'
        })
      }
      mermaidEls.forEach((mermaidEl, idx) => {
        mermaid.render(`mermaid-${idx}`, mermaidEl.textContent)
          .then(({ svg }) => { mermaidEl.innerHTML = svg })
          .catch(() => {})
      })
    })
  }

  return markdownEl
}

const style = `
@import url('https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown.css');
@import url('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.0/build/styles/github.min.css') (prefers-color-scheme: light);
@import url('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.0/build/styles/github-dark.min.css') (prefers-color-scheme: dark);
@import url('https://cdn.jsdelivr.net/npm/katex@0.16.15/dist/katex.min.css');

.markdown-body {
  padding: 30px 20px;
}

.markdown-body .mermaid {
  padding: 0;
  background-color: transparent;
}
`

class FsdnShow extends HTMLElement {
  update() {
    if (this.shadowRoot == null) return
    this.shadowRoot.querySelector('.markdown-body')?.remove()
    const markdown = this.getAttribute('markdown') || ''
    this.shadowRoot.appendChild(render(markdown, this.getAttribute('sanitize') != null))
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const styleEl = document.createElement('style')
    styleEl.textContent = style
    shadow.appendChild(styleEl)
    this.update()
    this.darkQuery = matchMedia('(prefers-color-scheme: dark)')
    this.darkQuery.listener = () => this.update()
    this.darkQuery.addEventListener('change', this.darkQuery.listener)
  }

  disconnectedCallback() {
    this.darkQuery.removeEventListener('change', this.darkQuery.listener)
  }

  attributeChangedCallback() {
    this.update()
  }

  static observedAttributes = ['markdown', 'sanitize']
}

customElements.define('fsdn-show', FsdnShow)
