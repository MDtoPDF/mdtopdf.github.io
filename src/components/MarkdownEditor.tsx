import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import DropZone from './DropZone';
import SAMPLE_TEMPLATE from '../sampleTemplate';

interface MarkdownEditorProps {
    value: string;
    onChange: (val: string) => void;
    className?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, className }) => {
    const handleChange = (val?: string) => onChange(val ?? '');

    const handleReset = () => {
        if (window.confirm('Reset to the sample template? Your current content will be lost.')) {
            onChange(SAMPLE_TEMPLATE);
        }
    };

    return (
        <div className={`editor-pane${className ? ` ${className}` : ''}`} data-color-mode="dark">
            <div className="pane-header">
                <span className="pane-title">Editor</span>
                <div className="pane-actions">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={handleReset}
                        title="Reset to sample template"
                    >
                        ↺ Reset
                    </button>
                </div>
            </div>
            <DropZone onFileLoaded={onChange} />
            <div className="editor-body">
                <MDEditor
                    value={value}
                    onChange={handleChange}
                    height="100%"
                    preview="edit"
                    hideToolbar={false}
                    visibleDragbar={false}
                    data-color-mode="dark"
                />
            </div>
        </div>
    );
};

export default MarkdownEditor;
