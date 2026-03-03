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

/**
 * Extracts YAML frontmatter from the beginning of a markdown string.
 * Supports both `---` (standard) and `--` (two-dash variant) delimiters.
 * Returns the parsed key/value pairs and the remaining body.
 */
function parseFrontmatter(raw: string): {
    fields: { key: string; value: string }[];
    body: string;
} {
    // Match --- or -- delimiter at the very start of the document
    const match = raw.match(/^(-{2,3})\r?\n([\s\S]*?)\r?\n\1\r?\n?([\s\S]*)$/);
    if (!match) return { fields: [], body: raw };

    const yamlBlock = match[2];
    const body = match[3] ?? '';

    const fields: { key: string; value: string }[] = [];
    for (const line of yamlBlock.split(/\r?\n/)) {
        const kv = line.match(/^([^:]+):\s*(.*)$/);
        if (kv) fields.push({ key: kv[1].trim(), value: kv[2].trim() });
    }

    return { fields, body };
}

const MarkdownPreview = forwardRef<MarkdownPreviewHandle, MarkdownPreviewProps>(
    ({ content }, ref) => {
        const contentRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            getElement: () => contentRef.current,
        }));

        const { fields, body } = parseFrontmatter(content);

        return (
            <div className="preview-body">
                <div className="markdown-content" ref={contentRef}>
                    {fields.length > 0 && (
                        <div className="frontmatter-block">
                            <dl className="frontmatter-list">
                                {fields.map(({ key, value }) => (
                                    <div className="frontmatter-row" key={key}>
                                        <dt className="frontmatter-key">{key}</dt>
                                        <dd className="frontmatter-value">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}
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
                        {body}
                    </ReactMarkdown>
                </div>
            </div>
        );
    }
);

MarkdownPreview.displayName = 'MarkdownPreview';

export default MarkdownPreview;
