import { Layout } from "antd";
import { useScroll } from "framer-motion";
import { type CSSProperties, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CircleLoading } from "@/components/loading";
import ProgressBar from "@/components/progress-bar";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";

import Header from "./header";
import Main from "./main";
import Nav from "./nav";

import { down, useMediaQuery } from "@/hooks";
import { ThemeLayout } from "#/enum";
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from "./config";

function DashboardLayout() {
	const { themeLayout } = useSettings();

	const mobileOrTablet = useMediaQuery(down("md"));

	const mainEl = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({ container: mainEl });

	/**
	 *  Tracks if content is scrolled
	 */
	const [offsetTop, setOffsetTop] = useState(false);

	const onOffSetTop = useCallback(() => {
		scrollY.on("change", (scrollHeight) => {
			setOffsetTop(scrollHeight > 0);
		});
	}, [scrollY]);

	useEffect(() => {
		onOffSetTop();
	}, [onOffSetTop]);

	const layoutClassName = useMemo(() => {
		return cn("flex h-screen overflow-hidden", themeLayout === ThemeLayout.Horizontal ? "flex-col" : "flex-row");
	}, [themeLayout]);

	const secondLayoutStyle: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		paddingLeft: mobileOrTablet
			? 0
			: themeLayout === ThemeLayout.Horizontal
				? 0
				: themeLayout === ThemeLayout.Mini
					? NAV_COLLAPSED_WIDTH
					: NAV_WIDTH,
	};

	return (
		<>
			<ProgressBar />
			<Layout className={layoutClassName}>
				<Suspense fallback={<CircleLoading />}>
					<Layout style={secondLayoutStyle}>
						<Header offsetTop={themeLayout !== ThemeLayout.Horizontal && offsetTop} />
						<Nav />
						<Main ref={mainEl} offsetTop={offsetTop} />
					</Layout>
				</Suspense>
			</Layout>
		</>
	);
}
export default DashboardLayout;
