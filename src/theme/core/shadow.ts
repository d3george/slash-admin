import type { ThemeTokens } from "../../../types/theme";
import { alpha } from "../../utils/color";
import { commonColors, paletteColors } from "./color";

const { gray, primary, secondary, info, success, warning, error } =
	paletteColors;
const { black } = commonColors;

export const lightShadowTokens: ThemeTokens["shadows"] = {
	none: `box-shadow: 0 0 ${alpha(black, 0)}`,
	sm: `box-shadow: 0 1px 2px 0 ${alpha(gray.main, 0.16)}`,
	base: `box-shadow: 0 4px 8px 0 ${alpha(gray.main, 0.16)}`,
	md: `box-shadow: 0 8px 16px 0 ${alpha(gray.main, 0.16)}`,
	lg: `box-shadow: 0 12px 24px 0 ${alpha(gray.main, 0.16)}`,
	xl: `box-shadow: 0 16px 32px 0 ${alpha(gray.main, 0.16)}`,
	"2xl": `box-shadow: 0 20px 40px 0 ${alpha(gray.main, 0.16)}`,
	"3xl": `box-shadow: 0 24px 48px 0 ${alpha(gray.main, 0.16)}`,
	inner: `box-shadow: inset 0 2px 4px 0 ${alpha(gray.main, 0.16)}`,

	// 组件阴影
	dialog: `box-shadow: -40px 40px 80px -8px ${alpha(black, 0.24)}`,
	card: `box-shadow: 0 0 2px 0 ${alpha(gray.main, 0.2)}, 0 12px 24px -4px ${alpha(gray.main, 0.12)}`,
	dropdown: `box-shadow: 0 0 2px 0 ${alpha(gray.main, 0.24)}, -20px 20px 40px -4px ${alpha(gray.main, 0.24)}`,
	primary: `box-shadow: 0 8px 16px 0 ${alpha(primary.main, 0.24)}`,
	secondary: `box-shadow: 0 8px 16px 0 ${alpha(secondary.main, 0.24)}`,
	info: `box-shadow: 0 8px 16px 0 ${alpha(info.main, 0.24)}`,
	success: `box-shadow: 0 8px 16px 0 ${alpha(success.main, 0.24)}`,
	warning: `box-shadow: 0 8px 16px 0 ${alpha(warning.main, 0.24)}`,
	error: `box-shadow: 0 8px 16px 0 ${alpha(error.main, 0.24)}`,
};

export const darkShadowTokens: ThemeTokens["shadows"] = {
	none: `box-shadow: 0 0 ${alpha(black, 0)}`,
	sm: `box-shadow: 0 1px 2px 0 ${alpha(black, 0.16)}`,
	base: `box-shadow: 0 4px 8px 0 ${alpha(black, 0.16)}`,
	md: `box-shadow: 0 8px 16px 0 ${alpha(black, 0.16)}`,
	lg: `box-shadow: 0 12px 24px 0 ${alpha(black, 0.16)}`,
	xl: `box-shadow: 0 16px 32px 0 ${alpha(black, 0.16)}`,
	"2xl": `box-shadow: 0 20px 40px 0 ${alpha(black, 0.16)}`,
	"3xl": `box-shadow: 0 24px 48px 0 ${alpha(black, 0.16)}`,
	inner: `box-shadow: inset 0 2px 4px 0 ${alpha(black, 0.16)}`,

	// 组件阴影
	dialog: `box-shadow: -40px 40px 80px -8px ${alpha(black, 0.24)}`,
	card: `box-shadow: 0 0 2px 0 ${alpha(black, 0.2)}, 0 12px 24px -4px ${alpha(black, 0.12)}`,
	dropdown: `box-shadow: 0 0 2px 0 ${alpha(black, 0.24)}, -20px 20px 40px -4px ${alpha(black, 0.24)}`,
	primary: `box-shadow: 0 8px 16px 0 ${alpha(primary.main, 0.24)}`,
	secondary: `box-shadow: 0 8px 16px 0 ${alpha(secondary.main, 0.24)}`,
	info: `box-shadow: 0 8px 16px 0 ${alpha(info.main, 0.24)}`,
	success: `box-shadow: 0 8px 16px 0 ${alpha(success.main, 0.24)}`,
	warning: `box-shadow: 0 8px 16px 0 ${alpha(warning.main, 0.24)}`,
	error: `box-shadow: 0 8px 16px 0 ${alpha(error.main, 0.24)}`,
};
