import type { CodeToHastOptions, ResolveBundleKey } from "shiki/bundle/web";

export * from "./code-bock";
export * from "./highlight-code";

export type HighlightCodeProps = {
	code: string;
	withCopy?: boolean;
	className?: string;
	options?: Omit<CodeToHastOptions<ResolveBundleKey<string>, ResolveBundleKey<string>>, "theme"> & { theme?: string };
};
export type CodeBlockProps = {
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
} & HighlightCodeProps;
