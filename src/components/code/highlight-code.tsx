import { Icon } from "@/components/icon";
import { useCopyToClipboard } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { cn } from "@/utils";
import { useState } from "react";
import { createHighlighter } from "shiki/bundle/web";
import type { HighlightCodeProps } from ".";

const highlighter = await createHighlighter({
	langs: ["javascript", "typescript", "jsx", "tsx"],
	themes: ["min-dark", "snazzy-light"],
});

export function HighlightCode({ code, options, className, withCopy = true }: HighlightCodeProps) {
	const { copyFn } = useCopyToClipboard();
	const [hovered, setHovered] = useState(false);
	const { themeMode } = useSettings();

	return (
		<div className={cn("w-full relative group", className)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			{withCopy && hovered && (
				<Button variant="outline" size="icon" className="absolute top-2 right-2 bg-accent" onClick={() => copyFn(code)}>
					<Icon icon="eva:copy-fill" size={24} />
				</Button>
			)}
			<div
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: highlighter.codeToHtml(code, {
						lang: options?.lang || "typescript",
						theme: options?.theme || (themeMode === "dark" ? "min-dark" : "snazzy-light"),
						transformers: [
							{
								pre(node) {
									this.addClassToHast(node, "p-3 rounded-md");
								},
							},
						],
						...options,
					}),
				}}
			/>
		</div>
	);
}
