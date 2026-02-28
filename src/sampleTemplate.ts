const SAMPLE_TEMPLATE = `# My Document Title

Welcome to **MDToPDF** — a fast, privacy-first markdown-to-PDF converter.
Everything runs in your browser. No signup, no servers.

---

## Getting Started

To begin:

1. Edit this document in the left pane
2. See your live preview on the right
3. Click **Download PDF** to export

You can also **drag & drop** any \`.md\` file onto the editor to load it instantly.

---

## Formatting Examples

### Text Styles

This is a paragraph with **bold text**, _italic text_, and \`inline code\`.
You can also use ~~strikethrough~~ and [hyperlinks](https://example.com).

### Lists

**Unordered:**
- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

**Ordered:**
1. First step
2. Second step
3. Third step

### Blockquote

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

---

## Code Block

\`\`\`typescript
interface Document {
  title: string;
  content: string;
  createdAt: Date;
}

const exportToPDF = (doc: Document): void => {
  const filename = doc.title || \`download-\${new Date().toISOString().slice(0, 10)}\`;
  console.log(\`Exporting: \${filename}.pdf\`);
};
\`\`\`

---

## Table Example

| Feature         | Status | Notes                     |
|-----------------|--------|---------------------------|
| Rich Editor     | ✅     | GFM toolbar included      |
| Live Preview    | ✅     | Updates as you type       |
| PDF Export      | ✅     | Named from heading        |
| Drag & Drop     | ✅     | Accepts \`.md\` files     |
| Syntax Highlight| ✅     | All major languages       |
| Mobile Layout   | ✅     | Pane toggle on mobile     |

---

## Image

![Brown wooden blocks on white surface — Unsplash](https://images.unsplash.com/photo-aSX6Kot_KEE?auto=format&fit=crop&w=800&q=80)

---

*Clear this template and start writing your own document!*
`;

export default SAMPLE_TEMPLATE;
