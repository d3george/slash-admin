import { IconButton, SvgIcon } from '@/components/icon';

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center">
      <IconButton className="h-10 w-10">
        <SvgIcon icon="ic-search" size="20" />
      </IconButton>
      <IconButton className="0 h-6 rounded-md bg-hover text-xs font-bold">⌘K</IconButton>
    </div>
  );
}
