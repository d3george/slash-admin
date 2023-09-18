import 'highlight.js/styles/base16/tomorrow-night.css';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
// markdown plugins
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'; // add support for strikethrough, tables, tasklists and URLs directly

type Props = ReactMarkdownOptions;
export default function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
    >
      {children}
    </ReactMarkdown>
  );
}
