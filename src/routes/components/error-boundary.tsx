import { themeVars } from "@/theme/theme.css";
import { ScrollArea } from "@/ui/scroll-area";
import { Title } from "@/ui/typography";
import type { CSSProperties } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorBoundary() {
	const error = useRouteError();

	return (
		<ScrollArea className="w-full h-screen">
			<div style={rootStyles()}>
				<div style={containerStyles()}>{renderErrorMessage(error)}</div>
			</div>
		</ScrollArea>
	);
}

function parseStackTrace(stack?: string) {
	if (!stack) return { filePath: null, functionName: null };

	const filePathMatch = stack.match(/\/src\/[^?]+/);
	const functionNameMatch = stack.match(/at (\S+)/);

	return {
		filePath: filePathMatch ? filePathMatch[0] : null,
		functionName: functionNameMatch ? functionNameMatch[1] : null,
	};
}

function renderErrorMessage(error: any) {
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<Title as="h2">
					{error.status}: {error.statusText}
				</Title>
				<p style={messageStyles()}>{error.data}</p>
			</>
		);
	}

	if (error instanceof Error) {
		const { filePath, functionName } = parseStackTrace(error.stack);

		return (
			<>
				<Title as="h2">Unexpected Application Error!</Title>
				<p style={messageStyles()}>
					{error.name}: {error.message}
				</p>
				<pre style={detailsStyles()}>{error.stack}</pre>
				{(filePath || functionName) && (
					<p style={filePathStyles()}>
						{filePath} ({functionName})
					</p>
				)}
			</>
		);
	}

	return <Title as="h2">Unknown Error</Title>;
}

const rootStyles = (): CSSProperties => {
	return {
		display: "flex",
		height: "100vh",
		flex: "1 1 auto",
		alignItems: "center",
		padding: "10vh 15px",
		flexDirection: "column",
		color: "white",
		backgroundColor: "#2c2c2e",
	};
};

const containerStyles = (): CSSProperties => {
	return {
		gap: 24,
		padding: 20,
		width: "100%",
		maxWidth: 960,
		display: "flex",
		borderRadius: 8,
		flexDirection: "column",
		backgroundColor: "#1c1c1e",
	};
};

const messageStyles = (): CSSProperties => {
	return {
		margin: 0,
		lineHeight: 1.5,
		padding: "12px 16px",
		whiteSpace: "pre-wrap",
		color: themeVars.colors.palette.error.default,
		backgroundColor: "#2a1e1e",
		borderLeft: `2px solid ${themeVars.colors.palette.error.default}`,
		fontWeight: 700,
	};
};

const detailsStyles = (): CSSProperties => {
	return {
		margin: 0,
		padding: 16,
		lineHeight: 1.5,
		overflow: "auto",
		borderRadius: "inherit",
		color: themeVars.colors.palette.warning.default,
		whiteSpace: "pre-wrap",
		backgroundColor: "#111111",
	};
};

const filePathStyles = (): CSSProperties => {
	return {
		marginTop: 16,
		color: themeVars.colors.palette.info.default,
	};
};
