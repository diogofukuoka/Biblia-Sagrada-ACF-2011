function parse(html) {
  const { JSDOM } = require("jsdom");
  const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`);
  const root = dom.window.document.body;
  
  let fullText = "";
  let formatting = [];
  
  function traverse(node) {
    if (node.nodeType === 3) { // TEXT_NODE
      fullText += node.textContent;
    } else if (node.nodeType === 1) { // ELEMENT_NODE
      const isBlock = ['DIV', 'P', 'BR'].includes(node.tagName);
      if (isBlock && node.tagName !== 'BR' && fullText.length > 0 && !fullText.endsWith('\n')) {
        // block starts, maybe add newline? Actually, div usually ends with newline, but nested divs? 
      }
      
      const start = fullText.length;
      
      if (node.tagName === 'BR') {
          fullText += '\n';
      } else {
          for (let child of node.childNodes) {
            traverse(child);
          }
      }
      
      const end = fullText.length;
      if (start !== end) {
        if (node.tagName === 'STRONG' || node.tagName === 'B') {
          formatting.push({ type: 'bold', startIndex: start, endIndex: end });
        } else if (node.tagName === 'EM' || node.tagName === 'I') {
          formatting.push({ type: 'italic', startIndex: start, endIndex: end });
        }
      }
      
      if (isBlock) {
        if (!fullText.endsWith('\n')) {
          fullText += '\n';
        }
      }
    }
  }
  
  traverse(root);
  return { fullText, formatting };
}

const html = `<div class="note-line note-verse-analysis">[ <em>Jesus chorou</em> ] <span class="note-arrow">→</span> <strong>A menor frase</strong> <span class="note-paren">(E mais profunda)</span></div><div class="note-spacer"><br></div><div class="note-line">Outra linha...</div>`;
console.log(parse(html));
