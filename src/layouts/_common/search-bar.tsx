import { IconButton, SvgIcon } from '@/components/icon';

export default function SearchBar() {
  return (
    <>
      <IconButton className="mr-1 h-9 w-9">
        <SvgIcon icon="ic-search" size="20" />
      </IconButton>
      <IconButton className="0 h-6 rounded-md bg-hover text-xs font-bold">⌘K</IconButton>
    </>
  );
}
