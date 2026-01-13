import * as marked from 'https://cdn.jsdelivr.net/npm/marked@15.0.4/lib/marked.esm.js'
import { gfmHeadingId } from 'https://cdn.jsdelivr.net/npm/marked-gfm-heading-id@4.1.1/+esm'
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.2.3/dist/purify.es.mjs'
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.0/build/es/highlight.min.js'
import renderMathInElement from 'https://cdn.jsdelivr.net/npm/katex@0.16.15/dist/contrib/auto-render.mjs'

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

  markdownEl.querySelectorAll('pre > code').forEach(codeEl => {
    const language = codeEl.classList[0]?.match(/^language-(.+)/)?.[1]
    if (hljs.getLanguage(language) != null) {
      codeEl.innerHTML = hljs.highlight(codeEl.textContent, { language, ignoreIllegals: true }).value
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
    if (preEl == null) {
      return
    }

    preEl.classList.add('mermaid')

    const mermaidShowEl = document.createElement('mermaid-show')
    mermaidShowEl.setAttribute('source', codeEl.textContent)
    codeEl.replaceWith(mermaidShowEl)
  })

  if (markdownEl.querySelector('mermaid-show') != null) {
    import('./mermaid-show.js')
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

.markdown-body pre.mermaid {
  padding: 0;
  background-color: transparent;
}
`

class FsdnShow extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const styleEl = document.createElement('style')
    styleEl.textContent = style

    shadow.appendChild(styleEl)
  }

  attributeChangedCallback() {
    this.shadowRoot.querySelector('.markdown-body')?.remove()

    const markdownEl = render(this.getAttribute('markdown') || '', this.getAttribute('sanitize') != null)

    this.shadowRoot.appendChild(markdownEl)
  }

  static observedAttributes = ['markdown', 'sanitize']
}

customElements.define('fsdn-show', FsdnShow)
