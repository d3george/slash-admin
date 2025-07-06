import MotionContainer from "@/components/animate/motion-container";
import { varBounce } from "@/components/animate/variants/bounce";
import { GLOBAL_CONFIG } from "@/global-config";
import { Button } from "@/ui/button";
import { Text, Title } from "@/ui/typography";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router";

interface ErrorLayoutProps {
	title: string;
	desc?: ReactNode;
	svg?: ReactNode;
	helmetTitle?: string;
	homePath?: string;
	buttonText?: string;
	slots?: {
		footer?: ReactNode;
	};
}

export default function ErrorLayout({
	title,
	desc,
	svg,
	helmetTitle,
	homePath = GLOBAL_CONFIG.defaultRoute,
	buttonText = "Go to Home",
	slots = {},
}: ErrorLayoutProps) {
	return (
		<>
			{helmetTitle && (
				<Helmet>
					<title>{helmetTitle}</title>
				</Helmet>
			)}
			<div className="m-auto max-w-[400px] flex items-center justify-center h-full">
				<MotionContainer className="flex flex-col items-center justify-center px-2 w-full gap-2">
					<m.div variants={varBounce().in}>
						<Title as="h2" className="text-center">
							{title}
						</Title>
					</m.div>
					{desc && (
						<m.div variants={varBounce().in}>
							<Text variant="subTitle1" color="secondary" align="center">
								{desc}
							</Text>
						</m.div>
					)}
					{svg && <m.div variants={varBounce().in}>{svg}</m.div>}

					{/* Slots: footer */}
					{slots.footer ? (
						slots.footer
					) : (
						<NavLink to={homePath} className="mt-4 w-full flex justify-center">
							<Button size="lg" variant="contrast">
								{buttonText}
							</Button>
						</NavLink>
					)}
				</MotionContainer>
			</div>
		</>
	);
}
