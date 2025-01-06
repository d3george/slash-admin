import { forwardRef, memo } from "react";
import SimpleBar, { type Props as SimplebarProps } from "simplebar-react";
/**
 * https://www.npmjs.com/package/simplebar-react?activeTab=readme
 */
const Scrollbar = forwardRef<HTMLElement, SimplebarProps>(({ children, ...other }, ref) => {
	return (
		<SimpleBar className="h-full" clickOnTrack={false} scrollableNodeProps={{ ref }} {...other}>
			{children}
		</SimpleBar>
	);
});

export default memo(Scrollbar);
