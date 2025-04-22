import { Icon } from "@/components/icon";
import { useTheme } from "@/theme/hooks";
import { cn } from "@/utils";
import { NavLink } from "react-router";

interface Props {
	size?: number | string;
	className?: string;
}
function Logo({ size = 50, className }: Props) {
	const { themeTokens } = useTheme();

	return (
		<NavLink to="/" className={cn(className)}>
			<Icon icon="solar:code-square-bold" color={themeTokens.color.palette.primary.default} size={size} />
		</NavLink>
	);
}

export default Logo;
