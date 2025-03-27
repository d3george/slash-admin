import { useState } from "react";
import { toast } from "sonner";

// ----------------------------------------------------------------------

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

type ReturnType = {
	copyFn: CopyFn;
	copiedText: CopiedValue;
};

export default function useCopyToClipboard(): ReturnType {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	const copyFn: CopyFn = async (text) => {
		if (navigator?.clipboard) {
			try {
				// Try to save to clipboard then save it in the state if worked
				await navigator.clipboard.writeText(text);
				setCopiedText(text);
				toast.success("Copied!");
				return true;
			} catch (error) {
				console.warn("Copy failed", error);
			}
		}

		const textArea = document.createElement("textarea");

		try {
			textArea.value = text;
			textArea.style.position = "fixed";
			textArea.style.opacity = "0";
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			textArea.remove();
			setCopiedText(text);
			toast.success("Copied!");
			return true;
		} catch (error) {
			textArea.remove();
			setCopiedText(null);
			return false;
		}
	};

	return { copiedText, copyFn };
}
