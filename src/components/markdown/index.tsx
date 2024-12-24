import ReactMarkdown from "react-markdown";
import type { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"; // add support for strikethrough, tables, tasklists and URLs directly
import "@/utils/highlight";
import StyledMarkdown from "./styles";

type Props = ReactMarkdownOptions;
export default function Markdown({ children }: Props) {
	return (
		<StyledMarkdown>
			<ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]} remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
				{children}
			</ReactMarkdown>
		</StyledMarkdown>
	);
}
