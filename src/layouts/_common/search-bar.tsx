import { SvgIcon } from '@/components/icon';

export default function SearchBar() {
  return (
    <>
      <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-hover">
        <SvgIcon icon="ic-search" size="20" />
      </button>
      <span className="flex h-6 cursor-pointer items-center justify-center rounded-md bg-hover px-2 py-0 text-xs font-bold">
        ⌘K
      </span>
    </>
  );
}
