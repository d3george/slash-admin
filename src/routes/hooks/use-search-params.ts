import { useMemo } from "react";
import { useSearchParams as _useSearchParams } from "react-router";

export function useSearchParams() {
	const [searchParams] = _useSearchParams();

	return useMemo(() => searchParams, [searchParams]);
}
