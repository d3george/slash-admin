import type { ThemeMode } from "./enum";

export type UILibraryAdapterProps = {
	mode: ThemeMode;
	children: React.ReactNode;
};
export type UILibraryAdapter = React.FC<UILibraryAdapterProps>;
