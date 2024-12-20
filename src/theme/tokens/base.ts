export const baseThemeTokens = {
	spacing: {
		0: "0",
		1: "4",
		2: "8",
		3: "12",
		4: "16",
		5: "20",
		6: "24",
		7: "28",
		8: "32",
		10: "40",
		12: "48",
		16: "64",
		20: "80",
		24: "96",
		32: "128",
	},
	borderRadius: {
		none: "0",
		sm: "2",
		base: "4",
		md: "6",
		lg: "8",
		xl: "12",
		full: "9999",
	},
	screens: {
		xs: "480", // => @media (min-width: 480px) { ... }
		sm: "576", // => @media (min-width: 576px) { ... }
		md: "768", // => @media (min-width: 768px) { ... }
		lg: "992", // => @media (min-width: 992px) { ... }
		xl: "1200", // => @media (min-width: 1200px) { ... }
		"2xl": "1600", // => @media (min-width: 1600px) { ... }
	},
	zIndex: {
		drawer: "1000",
		modal: "1000",
		snackbar: "1000",
		tooltip: "1000",
	},
};
