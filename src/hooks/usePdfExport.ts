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

/**
 * Injected during printing: hide the entire app, show only the print portal.
 * Uses @media print so it has zero effect on screen rendering.
 */
const HIDE_STYLES = `
  @media print {
    body > *:not(#mdtopdf-print-portal) { display: none !important; }
    #mdtopdf-print-portal {
      display: block !important;
      position: static !important;
      width: 100% !important;
      overflow: visible !important;
    }
  }
`;

/**
 * Typography & code styles for the printed document.
 * Wrapped in @media print so they don't affect the live app on screen.
 */
const PRINT_CONTENT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  @media print {
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    #mdtopdf-print-portal {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 11pt;
      line-height: 1.7;
      color: #111;
      background: #fff;
    }

    #mdtopdf-print-portal .markdown-content { max-width: 100%; }

    #mdtopdf-print-portal h1 { font-size: 22pt; font-weight: 700; margin: 0 0 14pt; padding-bottom: 7pt; border-bottom: 1.5pt solid #ddd; }
    #mdtopdf-print-portal h2 { font-size: 16pt; font-weight: 700; margin: 18pt 0 7pt; padding-bottom: 4pt; border-bottom: 1pt solid #eee; }
    #mdtopdf-print-portal h3 { font-size: 13pt; font-weight: 600; margin: 14pt 0 5pt; }
    #mdtopdf-print-portal h4 { font-size: 11pt; font-weight: 600; margin: 10pt 0 4pt; color: #444; }

    #mdtopdf-print-portal p { margin: 0 0 9pt; color: #222; }
    #mdtopdf-print-portal ul,
    #mdtopdf-print-portal ol { margin: 0 0 9pt 18pt; color: #222; }
    #mdtopdf-print-portal li + li { margin-top: 3pt; }
    #mdtopdf-print-portal strong { font-weight: 700; color: #111; }
    #mdtopdf-print-portal em { font-style: italic; }
    #mdtopdf-print-portal del { text-decoration: line-through; color: #666; }
    #mdtopdf-print-portal a { color: #5b4cdb; text-decoration: underline; }

    /* Inline code */
    #mdtopdf-print-portal code {
      font-family: 'Courier New', monospace;
      font-size: 8.5pt;
      background: #f0f0f0;
      border: 0.5pt solid #ddd;
      border-radius: 3pt;
      padding: 1pt 4pt;
      color: #c026d3;
    }

    /* Code blocks — let react-syntax-highlighter inline styles win (dark bg + colors) */
    #mdtopdf-print-portal pre {
      border-radius: 6pt;
      padding: 0;
      margin: 9pt 0;
      overflow: visible;
      white-space: pre-wrap;
      word-break: break-word;
      break-inside: avoid;
    }
    #mdtopdf-print-portal pre > div {
      border-radius: 6pt !important;
      margin: 0 !important;
      white-space: pre-wrap !important;
      word-break: break-word !important;
    }
    #mdtopdf-print-portal pre code {
      font-family: 'Courier New', monospace !important;
      font-size: 8.5pt !important;
      background: none !important;
      border: none !important;
      padding: 0 !important;
      /* No color override — let highlighter span inline styles win */
    }

    #mdtopdf-print-portal blockquote {
      border-left: 3pt solid #c4b5fd;
      margin: 9pt 0;
      padding: 6pt 12pt;
      background: #f5f3ff;
      color: #444;
      font-style: italic;
      break-inside: avoid;
    }

    #mdtopdf-print-portal table {
      width: 100%;
      border-collapse: collapse;
      margin: 9pt 0;
      font-size: 10pt;
      break-inside: avoid;
    }
    #mdtopdf-print-portal th {
      background: #f0f0f0;
      font-weight: 600;
      color: #111;
      padding: 5pt 9pt;
      border: 0.75pt solid #ccc;
      text-align: left;
    }
    #mdtopdf-print-portal td {
      padding: 4pt 9pt;
      border: 0.75pt solid #ccc;
      color: #222;
    }
    #mdtopdf-print-portal tr:nth-child(even) td { background: #fafafa; }

    #mdtopdf-print-portal hr { border: none; border-top: 1pt solid #ddd; margin: 12pt 0; }
    #mdtopdf-print-portal img { max-width: 100%; height: auto; border-radius: 4pt; break-inside: avoid; }

    /* Page breaks */
    #mdtopdf-print-portal h1,
    #mdtopdf-print-portal h2,
    #mdtopdf-print-portal h3,
    #mdtopdf-print-portal h4 { break-after: avoid; }
    #mdtopdf-print-portal pre,
    #mdtopdf-print-portal table,
    #mdtopdf-print-portal img,
    #mdtopdf-print-portal blockquote { break-inside: avoid; }

    @page { size: A4; margin: 18mm; }
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

      // Update document title → browser uses this as the suggested "Save as PDF" filename
      const prevTitle = document.title;
      document.title = title;

      // Build a print portal inside the current document (avoids popup blockers on mobile)
      const portal = document.createElement('div');
      portal.id = 'mdtopdf-print-portal';
      portal.style.display = 'none'; // hidden on screen; shown only via @media print
      portal.innerHTML = previewElement.innerHTML;
      document.body.appendChild(portal);

      // Inject styles
      const hideStyle = document.createElement('style');
      hideStyle.id = 'mdtopdf-hide-style';
      hideStyle.textContent = HIDE_STYLES;
      document.head.appendChild(hideStyle);

      const contentStyle = document.createElement('style');
      contentStyle.id = 'mdtopdf-content-style';
      contentStyle.textContent = PRINT_CONTENT_STYLES;
      document.head.appendChild(contentStyle);

      // Clean up after print dialog closes
      const cleanup = () => {
        document.title = prevTitle;
        portal.parentNode?.removeChild(portal);
        hideStyle.parentNode?.removeChild(hideStyle);
        contentStyle.parentNode?.removeChild(contentStyle);
        window.removeEventListener('afterprint', cleanup);
      };
      window.addEventListener('afterprint', cleanup);

      window.print();
    },
    []
  );

  return { exportPdf };
}
