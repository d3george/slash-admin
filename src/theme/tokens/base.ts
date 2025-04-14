import { breakpointsTokens } from "./breakpoints";

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
	screens: breakpointsTokens,
	opacity: {
		0: "0%",
		5: "5%",
		10: "10%",
		20: "20%",
		25: "25%",
		30: "30%",
		35: "35%",
		40: "40%",
		45: "45%",
		50: "50%",
		55: "55%",
		60: "60%",
		65: "65%",
		70: "70%",
		75: "75%",
		80: "80%",
		85: "85%",
		90: "90%",
		95: "95%",
		100: "100%",
		border: "20%",
		hover: "8%",
		selected: "16%",
		focus: "24%",
		disabled: "80%",
		disabledBackground: "24%",
	},
	zIndex: {
		appBar: "1100", // z-index of the navigation bar at the top of the application
		drawer: "1200", // z-index of the drawer/navigation menu
		modal: "1300", // z-index of the modal/dialog
		snackbar: "1400", // z-index of the notification/toast/alert/message
		tooltip: "1500", // z-index of the tooltip
	},
};
