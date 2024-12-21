import { themeVars } from "@/theme/theme.css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("#nprogress .bar", {
	background: themeVars.colors.palette.primary.default,
	boxShadow: `0 0 2px ${themeVars.colors.palette.primary.default}`,
});

globalStyle("#nprogress .peg", {
	boxShadow: `0 0 10px ${themeVars.colors.palette.primary.default}, 0 0 5px ${themeVars.colors.palette.primary.default}`,
});
