import { addCollection } from "@iconify/react";
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

// Cache for icon collection
let iconCollection: Record<string, IconifyIcon> | null = null;

/**
 * Auto import all SVG files to Iconify local collection
 *
 * @example
 * ├── src
 * │   ├── assets
 * │   │   └── icons
 * │   │       └── icon-name.svg
 *
 * @usage
 * import { Icon } from "@/components/icon";
 * <Icon icon="local:icon-name" />
 */

export default async function registerLocalIcons() {
	// If icons are already registered, return early
	if (iconCollection) {
		return;
	}

	const svgModules = import.meta.glob("../../assets/icons/*.svg", {
		query: "?raw",
		eager: true,
		import: "default",
	});
	const icons: Record<string, IconifyIcon> = {};

	for (const [path, svgContent] of Object.entries(svgModules)) {
		try {
			const iconName = path.split("/").pop()?.replace(".svg", "");

			if (iconName) {
				// Parse SVG content
				const parsedSVG = parseSVGContent(svgContent as string) as ParsedSVG;
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

				// Add icon to collection
				icons[iconName] = {
					body: parsedSVG.body,
					width,
					height,
				};
			}
		} catch (error) {
			console.error("Error processing SVG:", error);
		}
	}

	// Cache the icon collection
	iconCollection = icons;

	// Add the entire collection at once
	const result = addCollection({
		prefix: "local",
		icons,
		width: 24,
		height: 24,
	});

	if (!result) {
		console.warn("Failed to add icon collection");
	}
}
