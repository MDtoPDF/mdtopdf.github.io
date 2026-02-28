import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => (
    <div>
        <header className="site-header">
            <div className="logo">
                <div className="logo-icon">📄</div>
                <Link to="/">MDToPDF</Link>
            </div>
            <nav>
                <Link to="/app">Editor</Link>
                <Link to="/support">Support</Link>
                <Link to="/terms">Terms</Link>
            </nav>
        </header>
        <div className="page-container">
            <h1>Privacy Policy</h1>
            <p className="page-subtitle">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="page-section">
                <h2>Privacy by Design</h2>
                <p>
                    MDToPDF is built on a single principle: your content is yours. The application
                    performs all processing entirely within your browser using client-side JavaScript.
                    No data is transmitted to any server at any point.
                </p>
            </div>

            <div className="page-section">
                <h2>What We Collect</h2>
                <p>
                    <strong>Nothing.</strong> We do not collect, store, transmit, or process any of
                    the following:
                </p>
                <ul>
                    <li>Your markdown content or PDF output</li>
                    <li>Your name, email address, or any personal identifier</li>
                    <li>IP addresses or geolocation data</li>
                    <li>Usage analytics or behavioral tracking</li>
                    <li>Cookies or persistent browser storage of your content</li>
                </ul>
            </div>

            <div className="page-section">
                <h2>How It Works</h2>
                <p>
                    MDToPDF is a static website hosted on GitHub Pages. When you visit the site, your
                    browser downloads the application code. All subsequent processing — editing,
                    rendering, and PDF generation — happens locally on your device.
                </p>
            </div>

            <div className="page-section">
                <h2>Third-Party Services</h2>
                <p>
                    The site is hosted on <strong>GitHub Pages</strong>. GitHub may collect standard
                    server access logs (IP address, user agent, referrer) as part of their
                    infrastructure. You can review GitHub's privacy policy at{' '}
                    <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
                        github.com
                    </a>.
                </p>
            </div>

            <div className="page-section">
                <h2>Changes to This Policy</h2>
                <p>
                    If we make material changes to this policy, we will update the date at the top of
                    this page. Since we collect no data, such changes are unlikely.
                </p>
            </div>

            <div className="page-section">
                <h2>Contact</h2>
                <p>
                    Questions? Open an issue on{' '}
                    <a href="https://github.com/mdtopdf/mdtopdf.github.io" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>.
                </p>
            </div>
        </div>
    </div>
);

export default PrivacyPage;
