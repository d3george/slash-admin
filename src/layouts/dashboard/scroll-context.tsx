import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

const noop = () => {};

// context for scrollTop
type ScrollContextType = {
	offsetTop: boolean;
	setOffsetTop: (value: boolean) => void;
};
const ScrollContext = createContext<ScrollContextType>({
	offsetTop: false,
	setOffsetTop: noop,
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
	const [offsetTop, setOffsetTop] = useState(false);

	const offsetTopValue = useMemo(() => {
		return offsetTop;
	}, [offsetTop]);

	const setOffsetTopValue = useCallback((value: boolean) => {
		setOffsetTop(value);
	}, []);

	return (
		<ScrollContext.Provider
			value={{ offsetTop: offsetTopValue, setOffsetTop: setOffsetTopValue }}
		>
			{children}
		</ScrollContext.Provider>
	);
};

export const useScrollTop = () => useContext(ScrollContext);
