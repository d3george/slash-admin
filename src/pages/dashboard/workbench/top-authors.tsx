import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { faker } from "@faker-js/faker";

export default function TopAuthor() {
	const getTrophyIconColor = (index: number) => {
		switch (index) {
			case 1:
				return {
					color: themeVars.colors.palette.info.default,
					bg: `rgba(${themeVars.colors.palette.info.defaultChannel} / .4)`,
				};
			case 2: {
				return {
					color: themeVars.colors.palette.error.default,
					bg: `rgba(${themeVars.colors.palette.error.defaultChannel} / .4)`,
				};
			}
			default:
				return {
					color: themeVars.colors.palette.success.default,
					bg: `rgba(${themeVars.colors.palette.success.defaultChannel} / .4)`,
				};
		}
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Top Authors</CardTitle>
			</CardHeader>
			<CardContent>
				{new Array(3).fill("").map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="mb-4 flex">
						<img src={faker.image.avatarGitHub()} alt="" className="h-10 w-10 rounded-full" />
						<div className="ml-2 flex flex-col">
							<span>{faker.person.fullName()}</span>
							<div className="flex items-center  text-gray">
								<Icon icon="icon-park-solid:like" size={14} />
								<span className="ml-2">{faker.number.float({ min: 3, max: 9, multipleOf: 3 })}k</span>
							</div>
						</div>

						<div
							className="ml-auto flex h-10 w-10 items-center justify-center rounded-full"
							style={{
								background: getTrophyIconColor(index).bg,
							}}
						>
							<Icon icon="solar:cup-star-bold" size={24} color={getTrophyIconColor(index).color} />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
