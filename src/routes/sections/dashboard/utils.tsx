import { lazy } from "react";

const Pages = import.meta.glob("/src/pages/**/*.tsx");

export const loadComponentFromPath = (path: string) => {
	const pathArr = path.split("/");
	pathArr.unshift("/src");

	if (!pathArr.includes(".tsx")) {
		return pathArr.push("index.tsx");
	}
	return Pages[pathArr.join("/")];
};

export const Component = (path = "", props?: any): React.ReactNode => {
	if (!path) return null;

	let importFn = Pages[`/src${path}.tsx`];
	if (!importFn) importFn = Pages[`/src${path}/index.tsx`];
	if (!importFn) {
		console.warn("Component not found for path:", path);
		return null;
	}
	const Element = lazy(importFn as any);
	return <Element {...props} />;
};
