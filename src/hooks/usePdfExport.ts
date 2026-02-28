import { useCallback } from 'react';

/** Extracts the first H1 heading text from a markdown string. */
function extractHeading(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/** Returns a date string in YYYY-MM-DD format. */
function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #111;
    background: #fff;
    padding: 0;
    margin: 0;
  }

  .content { max-width: 100%; padding: 0; }

  h1 { font-size: 22pt; font-weight: 700; margin: 0 0 16pt; padding-bottom: 8pt; border-bottom: 1.5pt solid #ddd; }
  h2 { font-size: 16pt; font-weight: 700; margin: 20pt 0 8pt; padding-bottom: 5pt; border-bottom: 1pt solid #eee; }
  h3 { font-size: 13pt; font-weight: 600; margin: 16pt 0 6pt; }
  h4 { font-size: 11pt; font-weight: 600; margin: 12pt 0 4pt; color: #444; }

  p { margin: 0 0 10pt; color: #222; }

  ul, ol { margin: 0 0 10pt 18pt; color: #222; }
  li + li { margin-top: 3pt; }

  strong { font-weight: 700; color: #111; }
  em { font-style: italic; }
  del { text-decoration: line-through; color: #666; }

  a { color: #5b4cdb; text-decoration: underline; }

  code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 9pt;
    background: #f0f0f0;
    border: 0.5pt solid #ddd;
    border-radius: 3pt;
    padding: 1pt 4pt;
    color: #c026d3;
  }

  /* Let react-syntax-highlighter inline styles (dark bg + colors) come through untouched */
  pre {
    border-radius: 6pt;
    padding: 0;
    margin: 10pt 0;
    overflow: visible;
    white-space: pre-wrap;
    word-break: break-word;
    break-inside: avoid;
  }
  pre > div {
    border-radius: 6pt !important;
    margin: 0 !important;
    white-space: pre-wrap !important;
    word-break: break-word !important;
  }
  pre code {
    font-family: 'Courier New', Courier, monospace !important;
    font-size: 9pt !important;
    background: none !important;
    border: none !important;
    padding: 0 !important;
    /* do NOT set color — let inline span styles from highlighter win */
  }


  blockquote {
    border-left: 3pt solid #c4b5fd;
    margin: 10pt 0;
    padding: 6pt 12pt;
    background: #f5f3ff;
    color: #444;
    font-style: italic;
    break-inside: avoid;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0;
    font-size: 10pt;
    break-inside: avoid;
  }
  th {
    background: #f0f0f0;
    font-weight: 600;
    color: #111;
    padding: 6pt 10pt;
    border: 0.75pt solid #ccc;
    text-align: left;
  }
  td {
    padding: 5pt 10pt;
    border: 0.75pt solid #ccc;
    color: #222;
  }
  tr:nth-child(even) td { background: #fafafa; }

  hr { border: none; border-top: 1pt solid #ddd; margin: 14pt 0; }

  img { max-width: 100%; height: auto; border-radius: 4pt; break-inside: avoid; }

  /* Page break control */
  h1, h2, h3, h4 { break-after: avoid; }
  pre, table, img, figure, blockquote { break-inside: avoid; }

  @page {
    size: A4;
    margin: 18mm 18mm 18mm 18mm;
  }

  @media print {
    body { background: white; }
  }
`;

export function usePdfExport() {
  const exportPdf = useCallback(
    (previewElement: HTMLElement | null, markdown: string) => {
      if (!previewElement) return;

      const heading = extractHeading(markdown);
      const title = heading
        ? heading.replace(/[<>:"/\\|?*]/g, '').trim()
        : `download-${todayStr()}`;

      // Get the inner HTML of rendered markdown
      const contentHtml = previewElement.innerHTML;

      // Open a new window for printing
      const printWindow = window.open('', '_blank', 'width=900,height=700');
      if (!printWindow) {
        alert('Please allow pop-ups for this site to download PDF.');
        return;
      }

      printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>${PRINT_STYLES}</style>
</head>
<body>
  <div class="content">${contentHtml}</div>
  <script>
    // Wait for images/fonts then print
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.close();
      }, 400);
    };
  </script>
</body>
</html>`);

      printWindow.document.close();
    },
    []
  );

  return { exportPdf };
}
