import React, { useRef, useCallback } from 'react';

interface DropZoneProps {
    onFileLoaded: (content: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileLoaded }) => {
    const [dragging, setDragging] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(
        (file: File) => {
            if (!file.name.endsWith('.md') && file.type !== 'text/markdown') {
                alert('Please drop a .md (Markdown) file.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                onFileLoaded(text);
            };
            reader.readAsText(file);
        },
        [onFileLoaded]
    );

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    return (
        <div className="drop-zone">
            <div
                className={`drop-zone-inner${dragging ? ' dragging' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Drop a markdown file or click to open"
                onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Drop a <strong>.md</strong> file here, or click to open</span>
            </div>
            <input
                ref={inputRef}
                id="md-file-upload"
                name="md-file-upload"
                type="file"
                accept=".md,text/markdown"
                style={{ display: 'none' }}
                onChange={onInputChange}
            />
        </div>
    );
};

export default DropZone;
