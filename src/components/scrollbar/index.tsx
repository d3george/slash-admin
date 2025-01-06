import { cn } from "@/utils";
import { forwardRef } from "react";
import SimpleBar, { type Props as SimplebarProps } from "simplebar-react";
/**
 * https://www.npmjs.com/package/simplebar-react?activeTab=readme
 */
const Scrollbar = forwardRef<HTMLElement, SimplebarProps>(({ children, className, ...other }, ref) => {
	return (
		<SimpleBar
			className={cn("min-h-0 max-h-full", className)}
			scrollableNodeProps={{ ref }}
			clickOnTrack={false}
			{...other}
		>
			{children}
		</SimpleBar>
	);
});

export default Scrollbar;
