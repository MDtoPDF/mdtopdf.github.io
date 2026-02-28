import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import type { MarkdownPreviewHandle } from '../components/MarkdownPreview';
import { usePdfExport } from '../hooks/usePdfExport';
import SAMPLE_TEMPLATE from '../sampleTemplate';

type ActivePane = 'editor' | 'preview';

const AppPage: React.FC = () => {
    const [markdown, setMarkdown] = useState(SAMPLE_TEMPLATE);
    const [activePane, setActivePane] = useState<ActivePane>('editor');
    const previewRef = useRef<MarkdownPreviewHandle>(null);
    const { exportPdf } = usePdfExport();

    const handleDownload = () => {
        exportPdf(previewRef.current?.getElement() ?? null, markdown);
    };

    return (
        <div className="app-shell">
            {/* App Header */}
            <header className="app-header">
                <div className="logo">
                    <div className="logo-icon" aria-hidden="true">📄</div>
                    <Link to="/">MDToPDF</Link>
                </div>
                <div className="app-header-actions">
                    <button
                        id="download-pdf-btn"
                        className="btn btn-primary btn-lg"
                        onClick={handleDownload}
                        title="Download as PDF"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </header>

            {/* Mobile pane toggle */}
            <div className="mobile-tabs" role="tablist" aria-label="Switch panes">
                <button
                    id="mobile-tab-editor"
                    className={`mobile-tab${activePane === 'editor' ? ' active' : ''}`}
                    role="tab"
                    aria-selected={activePane === 'editor'}
                    onClick={() => setActivePane('editor')}
                >
                    ✏️ Editor
                </button>
                <button
                    id="mobile-tab-preview"
                    className={`mobile-tab${activePane === 'preview' ? ' active' : ''}`}
                    role="tab"
                    aria-selected={activePane === 'preview'}
                    onClick={() => setActivePane('preview')}
                >
                    👁 Preview
                </button>
            </div>

            {/* Split layout */}
            <div className="editor-layout">
                {/* Left: Editor */}
                <MarkdownEditor
                    value={markdown}
                    onChange={setMarkdown}
                    className={activePane === 'editor' ? 'mobile-visible' : ''}
                />

                {/* Right: Preview */}
                <div
                    className={`preview-pane${activePane === 'preview' ? ' mobile-visible' : ''}`}
                    role="tabpanel"
                    aria-label="Markdown preview"
                >
                    <div className="pane-header">
                        <span className="pane-title">Preview</span>
                    </div>
                    <MarkdownPreview ref={previewRef} content={markdown} />
                </div>
            </div>
        </div>
    );
};

export default AppPage;
