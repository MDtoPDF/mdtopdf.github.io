import React from 'react';
import { Link } from 'react-router-dom';

const SupportPage: React.FC = () => (
    <div>
        <header className="site-header">
            <div className="logo">
                <div className="logo-icon">📄</div>
                <Link to="/">MDToPDF</Link>
            </div>
            <nav>
                <Link to="/app">Editor</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms</Link>
            </nav>
        </header>
        <div className="page-container">
            <h1>Support</h1>
            <p className="page-subtitle">Need help? We've got you covered.</p>

            <div className="page-section">
                <h2>Frequently Asked Questions</h2>
            </div>

            <div className="page-section">
                <h2>Is MDToPDF free?</h2>
                <p>Yes, completely free and open source. No account required, ever.</p>
            </div>

            <div className="page-section">
                <h2>Does it send my data anywhere?</h2>
                <p>
                    No. Everything runs entirely in your browser. Your markdown content never leaves
                    your device. No servers, no analytics on your content, no storage.
                </p>
            </div>

            <div className="page-section">
                <h2>What Markdown features are supported?</h2>
                <p>MDToPDF supports GitHub Flavored Markdown (GFM), including:</p>
                <ul>
                    <li>Headings (H1–H6), paragraphs, bold, italic, strikethrough</li>
                    <li>Ordered and unordered lists, nested lists</li>
                    <li>Fenced code blocks with syntax highlighting (100+ languages)</li>
                    <li>Tables, blockquotes, horizontal rules</li>
                    <li>Inline code, links, and images</li>
                </ul>
            </div>

            <div className="page-section">
                <h2>How is the PDF filename determined?</h2>
                <p>
                    MDToPDF uses the first <code># Heading</code> in your document as the PDF filename.
                    If no heading is found, it falls back to <code>download-YYYY-MM-DD.pdf</code>.
                </p>
            </div>

            <div className="page-section">
                <h2>Can I load an existing .md file?</h2>
                <p>
                    Yes! Drag and drop any <code>.md</code> file directly onto the editor pane, or
                    click the drop zone to open a file picker.
                </p>
            </div>

            <div className="page-section">
                <h2>Still need help?</h2>
                <p>
                    Open an issue on our{' '}
                    <a href="https://github.com/mdtopdf/mdtopdf.github.io/issues" target="_blank" rel="noopener noreferrer">
                        GitHub repository
                    </a>
                    . We typically respond within 48 hours.
                </p>
            </div>
        </div>
    </div>
);

export default SupportPage;
