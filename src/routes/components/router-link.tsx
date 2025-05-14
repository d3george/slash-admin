import { Link } from "react-router";
import type { LinkProps } from "react-router";

interface RouterLinkProps extends Omit<LinkProps, "to"> {
	href: string;
	ref?: React.Ref<HTMLAnchorElement>;
}

export const RouterLink: React.FC<RouterLinkProps> = ({ href, ...props }) => (
	<Link ref={props.ref} to={href} {...props} />
);
