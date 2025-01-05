import { HEADER_HEIGHT } from "@/layouts/dashboard/config";
import { forwardRef, memo } from "react";
import SimpleBar, { type Props as SimplebarProps } from "simplebar-react";
/**
 * https://www.npmjs.com/package/simplebar-react?activeTab=readme
 */
const Scrollbar = forwardRef<HTMLElement, SimplebarProps>(({ children, ...other }, ref) => {
	return (
		<SimpleBar
			clickOnTrack={false}
			scrollableNodeProps={{ ref }}
			style={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}
			{...other}
		>
			{children}
		</SimpleBar>
	);
});

export default memo(Scrollbar);
