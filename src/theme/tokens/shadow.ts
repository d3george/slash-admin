import Color from "color";

export const createShadowTokens = (colors: any) => ({
	none: `box-shadow: 0 0 ${Color(colors.palette.gray[500]).alpha(0)}`,
	sm: `box-shadow: 0 1px 2px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	base: `box-shadow: 0 4px 8px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	md: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	lg: `box-shadow: 0 12px 24px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	xl: `box-shadow: 0 16px 32px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	"2xl": `box-shadow: 0 20px 40px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	"3xl": `box-shadow: 0 24px 48px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,
	inner: `box-shadow: inset 0 2px 4px 0 ${Color(colors.palette.gray[500]).alpha(0.16)}`,

	dialog: `box-shadow: -40px 40px 80px -8px ${Color(colors.common.black).alpha(0.24)}`,
	card: `box-shadow: 0 0 2px 0 ${Color(colors.palette.gray[500]).alpha(0.2)}, 0 12px 24px -4px ${Color(colors.palette.gray[500]).alpha(0.12)}`,
	dropdown: `box-shadow: 0 0 2px 0 ${Color(colors.palette.gray[500]).alpha(0.24)}, -20px 20px 40px -4px ${Color(colors.palette.gray[500]).alpha(0.24)}`,

	primary: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.primary.main).alpha(0.24)}`,
	secondary: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.secondary.main).alpha(0.24)}`,
	info: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.info.main).alpha(0.24)}`,
	success: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.success.main).alpha(0.24)}`,
	warning: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.warning.main).alpha(0.24)}`,
	error: `box-shadow: 0 8px 16px 0 ${Color(colors.palette.error.main).alpha(0.24)}`,
});
