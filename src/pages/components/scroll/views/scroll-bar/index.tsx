import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { faker } from "@faker-js/faker";

const TEXT = faker.lorem.paragraphs({ min: 20, max: 30 });
export default function ScrollbarView() {
	return (
		<>
			<Button variant="link" asChild>
				<a
					href="https://grsmto.github.io/simplebar/"
					style={{ color: themeVars.colors.palette.primary.default }}
					className="mb-4 block"
				>
					https://grsmto.github.io/simplebar/
				</a>
			</Button>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card title="Vertical">
					<CardHeader>
						<CardTitle>Vertical</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[420px]">{TEXT}</ScrollArea>
					</CardContent>
				</Card>
				<Card title="Horizontal">
					<CardHeader>
						<CardTitle>Horizontal</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="w-full pb-2">
							<div style={{ width: "200%" }}>{TEXT}</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
