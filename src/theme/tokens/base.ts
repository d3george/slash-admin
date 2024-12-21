export const baseThemeTokens = {
	spacing: {
		0: "0px",
		1: "4px",
		2: "8px",
		3: "12px",
		4: "16px",
		5: "20px",
		6: "24px",
		7: "28px",
		8: "32px",
		10: "40px",
		12: "48px",
		16: "64px",
		20: "80px",
		24: "96px",
		32: "128px",
	},
	borderRadius: {
		none: "0px",
		sm: "2px",
		default: "4px",
		md: "6px",
		lg: "8px",
		xl: "12px",
		full: "9999px",
	},
	screens: {
		xs: "480px", // => @media (min-width: 480px) { ... }
		sm: "576px", // => @media (min-width: 576px) { ... }
		md: "768px", // => @media (min-width: 768px) { ... }
		lg: "992px", // => @media (min-width: 992px) { ... }
		xl: "1200px", // => @media (min-width: 1200px) { ... }
		"2xl": "1600px", // => @media (min-width: 1600px) { ... }
	},
	zIndex: {
		drawer: "1000",
		modal: "1000",
		snackbar: "1000",
		tooltip: "1000",
	},
};
