import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useUserToken } from "@/store/userStore";

import PageError from "@/pages/sys/error/PageError";
import { useRouter } from "../hooks";

type Props = {
	children: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
	const router = useRouter();
	const { accessToken } = useUserToken();

	const check = useCallback(() => {
		if (!accessToken) {
			router.replace("/login");
		}
	}, [router, accessToken]);

	useEffect(() => {
		check();
	}, [check]);

	return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
