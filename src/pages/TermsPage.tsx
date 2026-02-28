import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => (
    <div>
        <header className="site-header">
            <div className="logo">
                <div className="logo-icon">📄</div>
                <Link to="/">MDToPDF</Link>
            </div>
            <nav>
                <Link to="/app">Editor</Link>
                <Link to="/support">Support</Link>
                <Link to="/privacy">Privacy</Link>
            </nav>
        </header>
        <div className="page-container">
            <h1>Terms of Service</h1>
            <p className="page-subtitle">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="page-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using MDToPDF ("the Service"), you agree to be bound by these
                    Terms of Service. If you do not agree, please discontinue use of the Service.
                </p>
            </div>

            <div className="page-section">
                <h2>2. Description of Service</h2>
                <p>
                    MDToPDF provides a free, browser-based tool for converting Markdown documents to
                    PDF files. The Service operates entirely client-side and requires no registration.
                </p>
            </div>

            <div className="page-section">
                <h2>3. User Responsibilities</h2>
                <p>You are solely responsible for the content you create or convert using the Service. You agree not to use the Service to:</p>
                <ul>
                    <li>Generate or distribute unlawful, harmful, or infringing content</li>
                    <li>Attempt to reverse-engineer, tamper with, or disrupt the Service</li>
                    <li>Misrepresent the origin or authorship of generated documents</li>
                </ul>
            </div>

            <div className="page-section">
                <h2>4. Intellectual Property</h2>
                <p>
                    MDToPDF is open source software released under the MIT License. The source code is
                    available at{' '}
                    <a href="https://github.com/mdtopdf/mdtopdf.github.io" target="_blank" rel="noopener noreferrer">
                        github.com/mdtopdf
                    </a>. You retain full ownership of any content you create using the Service.
                </p>
            </div>

            <div className="page-section">
                <h2>5. Disclaimer of Warranties</h2>
                <p>
                    The Service is provided "as is" without warranty of any kind, express or implied,
                    including but not limited to warranties of merchantability, fitness for a particular
                    purpose, or non-infringement. We do not guarantee that the Service will be
                    uninterrupted, error-free, or that generated PDFs will meet specific formatting
                    requirements.
                </p>
            </div>

            <div className="page-section">
                <h2>6. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, the authors of MDToPDF shall not be liable
                    for any indirect, incidental, special, consequential, or punitive damages arising
                    from your use of the Service.
                </p>
            </div>

            <div className="page-section">
                <h2>7. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. Continued use of the
                    Service after changes constitutes acceptance of the updated terms.
                </p>
            </div>
        </div>
    </div>
);

export default TermsPage;
