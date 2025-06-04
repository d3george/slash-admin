import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { faker } from "@faker-js/faker";

export default function PermissionPageTest() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			{Array.from({ length: 10 }).map((_, index) => (
				<Card key={faker.string.uuid()}>
					<CardHeader>
						<CardTitle>Card {index + 1}</CardTitle>
						<CardDescription>{faker.lorem.paragraph()}</CardDescription>
					</CardHeader>
					<CardContent>{faker.lorem.paragraphs(3)}</CardContent>
				</Card>
			))}
		</div>
	);
}
