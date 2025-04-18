import ScrollProgress from "@/components/scroll-progress";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { faker } from "@faker-js/faker";
import { useScroll } from "framer-motion";
import { useRef } from "react";

const TEXT = faker.lorem.paragraphs({ min: 20, max: 30 });
export default function ScrollProgressView() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const containerScroll = useScroll({ container: containerRef });

	return (
		<>
			<Button variant="link" asChild>
				<a
					href="https://www.framer.com/motion/"
					style={{ color: themeVars.colors.palette.primary.default }}
					className="mb-4 block"
				>
					https://www.framer.com/motion/
				</a>
			</Button>
			<Card title="ScrollProgress">
				<CardHeader>
					<CardTitle>ScrollProgress</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollProgress scrollYProgress={containerScroll.scrollYProgress} />
					<div ref={containerRef} className="h-80 overflow-auto">
						{[...Array(4)].map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={index}>{TEXT}</div>
						))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
