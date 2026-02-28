import React from 'react';
import { Link } from 'react-router-dom';

const features = [
    {
        icon: '✏️',
        title: 'Rich Markdown Editor',
        desc: 'Full GitHub Flavored Markdown support with a handy toolbar, keyboard shortcuts, and syntax highlighting.',
    },
    {
        icon: '👁',
        title: 'Live Preview',
        desc: 'Your rendered document updates in real time as you type — tables, code, images and all.',
    },
    {
        icon: '⬇️',
        title: 'One-Click PDF Export',
        desc: "Downloads a properly paginated A4 PDF named after your document's first heading.",
    },
    {
        icon: '📂',
        title: 'Drag & Drop Import',
        desc: 'Drop any .md file onto the editor to load it instantly. No file size limits, no upload.',
    },
];

const LandingPage: React.FC = () => {
    return (
        <div className="landing">
            {/* Header */}
            <header className="site-header">
                <div className="logo">
                    <div className="logo-icon" aria-hidden="true">📄</div>
                    <span>MDToPDF</span>
                </div>
                <nav aria-label="Site navigation">
                    <Link to="/app">Editor</Link>
                    <Link to="/support">Support</Link>
                    <Link to="/privacy">Privacy</Link>
                </nav>
            </header>

            <main>
                {/* Hero */}
                <section className="hero" aria-labelledby="hero-heading">
                    <div className="hero-badge">
                        <span>🔒</span>
                        <span>100% Private — runs entirely in your browser</span>
                    </div>

                    <h1 id="hero-heading">
                        Write Markdown.<br />
                        <span>Download PDF.</span> Instantly.
                    </h1>
                    <p>
                        A free, distraction-free tool that converts your Markdown files to beautifully
                        formatted PDFs — all client-side. No login, no servers, no data sent anywhere.
                    </p>

                    <div className="hero-actions">
                        <Link to="/app" id="hero-cta" className="btn btn-primary btn-lg">
                            Open Editor →
                        </Link>
                        <a
                            href="https://github.com/mdtopdf/mdtopdf.github.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-lg"
                        >
                            View on GitHub
                        </a>
                    </div>

                    {/* Inline mockup */}
                    <div className="hero-mockup" aria-hidden="true">
                        <div className="mockup-bar">
                            <div className="mockup-dot red"></div>
                            <div className="mockup-dot yellow"></div>
                            <div className="mockup-dot green"></div>
                        </div>
                        <div className="mockup-content">
                            <div className="mockup-pane editor">
                                <div className="md-h1"># My Document Title</div>
                                <div>&nbsp;</div>
                                <div>A <span className="md-bold">bold</span> introduction paragraph.</div>
                                <div>&nbsp;</div>
                                <div className="md-h2">## Features</div>
                                <div>&nbsp;</div>
                                <div>- Item one</div>
                                <div>- Item two</div>
                                <div>&nbsp;</div>
                                <div><span className="md-code">```typescript</span></div>
                                <div><span className="md-code">const x = "hello";</span></div>
                                <div><span className="md-code">```</span></div>
                            </div>
                            <div className="mockup-pane preview">
                                <div className="prev-h1">My Document Title</div>
                                <div className="prev-p">A <strong>bold</strong> introduction paragraph.</div>
                                <div className="prev-p" style={{ marginTop: '0.5rem', fontWeight: 600 }}>Features</div>
                                <div className="prev-p">• Item one</div>
                                <div className="prev-p">• Item two</div>
                                <div className="prev-code">const x = "hello";</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="features-section" aria-labelledby="features-heading">
                    <div className="section-label">What it does</div>
                    <h2 id="features-heading">Everything you need, nothing you don't</h2>
                    <div className="features-grid">
                        {features.map((f) => (
                            <article key={f.title} className="feature-card">
                                <div className="feature-icon" aria-hidden="true">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <strong>MDToPDF</strong>
                        An open-source, privacy-first markdown converter.<br />
                        No accounts. No tracking. No nonsense.
                    </div>
                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} MDToPDF. Open source under the MIT License.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
