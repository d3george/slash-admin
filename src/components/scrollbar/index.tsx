import { forwardRef, memo } from 'react';
import SimpleBar, { Props as SimplebarProps } from 'simplebar-react';

/**
 * https://www.npmjs.com/package/simplebar-react?activeTab=readme
 */
const Scrollbar = forwardRef<HTMLElement, SimplebarProps>(({ children, ...other }, ref) => {
  return (
    <SimpleBar scrollableNodeProps={{ ref }} {...other} clickOnTrack={false} className="h-full">
      {children}
    </SimpleBar>
  );
});

export default memo(Scrollbar);
