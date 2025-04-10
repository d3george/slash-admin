import { Icon } from "@/components/icon";
import { useTheme } from "@/theme/hooks";
import { NavLink } from "react-router";

interface Props {
	size?: number | string;
}
function Logo({ size = 50 }: Props) {
	const { themeTokens } = useTheme();

	return (
		<NavLink to="/">
			<Icon icon="solar:code-square-bold" color={themeTokens.color.palette.primary.default} size={size} />
		</NavLink>
	);
}

export default Logo;
