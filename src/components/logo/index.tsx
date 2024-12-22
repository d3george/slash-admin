import { NavLink } from "react-router";

import { useTheme } from "@/theme/hooks";

import { Iconify } from "../icon";

interface Props {
	size?: number | string;
}
function Logo({ size = 50 }: Props) {
	const { themeTokens } = useTheme();

	return (
		<NavLink to="/">
			<Iconify icon="solar:code-square-bold" color={themeTokens.color.palette.primary.default} size={size} />
		</NavLink>
	);
}

export default Logo;
