export * from "./code-bock";
export * from "./highlight-code";

export type HighlightCodeProps = {
	code: string;
	lang?: string;
	withCopy?: boolean;
	className?: string;
};
export type CodeBlockProps = {
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
} & HighlightCodeProps;
