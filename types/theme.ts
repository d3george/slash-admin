import type { ThemeMode } from "./enum";

// 色阶定义
export interface ColorScale {
	lighter: string;
	light: string;
	main: string;
	dark: string;
	darker: string;
	[key: string]: string;
}
// 调色板定义
export interface Palette {
	primary: ColorScale;
	secondary: ColorScale;
	success: ColorScale;
	warning: ColorScale;
	error: ColorScale;
	info: ColorScale;
	gray: {
		lightest: string;
		lighter: string;
		light: string;
		lightMedium: string;
		main: string;
		darkMedium: string;
		dark: string;
		darker: string;
		darkest: string;
	};
}

// 文本颜色类型定义
export interface TextColors {
	primary: string;
	secondary: string;
	disabled: string;
}

// 背景颜色类型定义
export interface BackgroundColors {
	default: string;
	paper: string;
	neutral: string;
}

// 完整的颜色系统定义
export interface ThemeColors {
	palette: Palette;
	text: TextColors;
	background: BackgroundColors;
	common: {
		black: string;
		white: string;
	};
}

export interface ThemeTypography {
	fontFamily: {
		primary: string;
		secondary: string;
	};
	fontSize: {
		xs: number;
		sm: number;
		base: number;
		lg: number;
		xl: number;
	};
	fontWeight: {
		light: number;
		normal: number;
		medium: number;
		semibold: number;
		bold: number;
	};
	lineHeight: {
		none: number;
		tight: number;
		normal: number;
		relaxed: number;
	};
}

export interface ThemeTokens {
	// 基础颜色
	colors: ThemeColors;

	// 排版
	typography: ThemeTypography;

	// 间距
	spacing: {
		0: number;
		1: number;
		2: number;
		3: number;
		4: number;
		5: number;
		6: number;
		8: number;
		10: number;
		12: number;
		16: number;
		20: number;
		24: number;
		32: number;
	};

	// 圆角
	borderRadius: {
		none: number;
		sm: number;
		base: number;
		md: number;
		lg: number;
		xl: number;
		full: number;
	};

	// 阴影
	shadows: {
		sm: string;
		md: string;
		lg: string;
		xl: string;
	};

	// 断点
	screens: {
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
		"2xl": number;
	};

	// z-index
	zIndex: {
		drawer: number;
		modal: number;
		snackbar: number;
		tooltip: number;
	};
}

export type UILibraryAdapterProps = {
	tokens: ThemeTokens;
	mode: ThemeMode;
	children: React.ReactNode;
};
export type UILibraryAdapter = React.FC<UILibraryAdapterProps>;
