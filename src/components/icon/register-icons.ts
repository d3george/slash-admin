import { addIcon } from "@iconify/react";
import { parseSVGContent } from "@iconify/utils/lib/svg/parse";

interface IconifyIcon {
	body: string;
	width: number;
	height: number;
}

interface ParsedSVG {
	body: string;
	attribs?: {
		width?: string;
		height?: string;
		viewBox?: string;
	};
}

// Auto import all SVG files
export default async function registerLocalIcons() {
	const svgModules = import.meta.glob("../../assets/icons/*.svg", { as: "raw" });

	for (const path in svgModules) {
		try {
			const svgContent = await svgModules[path]();
			const iconName = path.split("/").pop()?.replace(".svg", "");

			if (iconName) {
				// Parse SVG content
				const parsedSVG = parseSVGContent(svgContent) as ParsedSVG;
				if (!parsedSVG) {
					console.warn(`Failed to parse SVG: ${iconName}`);
					continue;
				}

				// Ensure body is valid content
				if (!parsedSVG.body) {
					console.warn(`Failed to get SVG body for ${iconName}`);
					continue;
				}

				// Get SVG width and height
				let width = 24;
				let height = 24;

				// Extract dimensions from viewBox or width/height attributes
				if (parsedSVG.attribs?.viewBox) {
					const viewBox = parsedSVG.attribs.viewBox.split(" ");
					if (viewBox.length === 4) {
						width = Number.parseInt(viewBox[2], 10);
						height = Number.parseInt(viewBox[3], 10);
					}
				}

				// Build IconifyIcon data
				const iconData: IconifyIcon = {
					body: parsedSVG.body,
					width,
					height,
				};

				// Add icon
				const result = addIcon(`local:${iconName}`, iconData);
				if (!result) {
					console.warn(`Failed to add icon: ${iconName}`);
				}
			}
		} catch (error) {
			console.error("Error processing SVG:", error);
		}
	}
}
