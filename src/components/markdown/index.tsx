import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
// markdown plugins
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'; // add support for strikethrough, tables, tasklists and URLs directly

import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';
import '@/utils/highlight';

import StyledMarkdown from './styles';

type Props = ReactMarkdownOptions;
export default function Markdown({ children }: Props) {
  const token = useThemeToken();
  const { themeMode } = useSettings();
  return (
    <StyledMarkdown $token={token} $thememode={themeMode}>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {children}
      </ReactMarkdown>
    </StyledMarkdown>
  );
}
