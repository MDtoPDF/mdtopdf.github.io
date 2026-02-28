import { useRef, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownPreviewProps {
    content: string;
}

export interface MarkdownPreviewHandle {
    getElement: () => HTMLDivElement | null;
}

const MarkdownPreview = forwardRef<MarkdownPreviewHandle, MarkdownPreviewProps>(
    ({ content }, ref) => {
        const contentRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            getElement: () => contentRef.current,
        }));

        return (
            <div className="preview-body">
                <div className="markdown-content" ref={contentRef}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            code({ inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            borderRadius: '8px',
                                            marginTop: '0.5rem',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.85em',
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }
);

MarkdownPreview.displayName = 'MarkdownPreview';

export default MarkdownPreview;
