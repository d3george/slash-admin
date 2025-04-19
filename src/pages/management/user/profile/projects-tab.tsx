import { fakeAvatars } from "@/_mock/utils";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { faker } from "@faker-js/faker";
import { Avatar, Divider, Tag } from "antd";
import dayjs from "dayjs";

export default function ProjectsTab() {
	const items = [
		{
			icon: <Icon icon="logos:react" size={40} />,
			name: "Admin Template",
			client: faker.person.fullName(),
			desc: "Time is our most valuable asset, that is why we want to help you save it by creating…",
			members: fakeAvatars(15),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "98/135",
			allTasks: faker.number.int({ min: 60, max: 99 }),
			closedTasks: faker.number.int({ min: 30, max: 60 }),
		},
		{
			icon: <Icon icon="logos:vue" size={40} />,
			name: "App Design",
			desc: "App design combines the user interface (UI) and user experience (UX).  ",
			client: faker.person.fullName(),
			members: fakeAvatars(27),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "880/421",
			allTasks: faker.number.int({ min: 60, max: 99 }),
			closedTasks: faker.number.int({ min: 30, max: 60 }),
		},
		{
			icon: <Icon icon="logos:figma" size={40} />,
			name: "Figma Dashboard",
			desc: "Use this template to organize your design project. Some of the key features are… ",
			client: faker.person.fullName(),
			members: fakeAvatars(32),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "1.2k/820",
			allTasks: faker.number.int({ min: 60, max: 99 }),
			closedTasks: faker.number.int({ min: 30, max: 60 }),
		},
		{
			icon: <Icon icon="logos:html-5" size={40} />,
			name: "Create Website",
			desc: "Your domain name should reflect your products or services so that your...  ",
			client: faker.person.fullName(),
			members: fakeAvatars(221),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 236,
			allHours: "142/420",
			allTasks: faker.number.int({ min: 60, max: 99 }),
			closedTasks: faker.number.int({ min: 30, max: 60 }),
		},
		{
			icon: <Icon icon="logos:adobe-xd" size={40} />,
			name: "Logo Design",
			desc: "Premium logo designs created by top logo designers. Create the branding of business.  ",
			client: faker.person.fullName(),
			members: fakeAvatars(125),
			startDate: dayjs(faker.date.past({ years: 1 })),
			deadline: dayjs(faker.date.future({ years: 1 })),
			messages: 232,
			allHours: "580/445",
			allTasks: faker.number.int({ min: 60, max: 99 }),
			closedTasks: faker.number.int({ min: 30, max: 60 }),
		},
	];
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			{items.map((item) => (
				<Card key={item.name} className="flex w-full flex-col">
					<CardContent>
						<header className="flex w-full items-center">
							{item.icon}

							<div className="flex flex-col">
								<span className="ml-4 text-xl opacity-70">{item.name}</span>
								<span className="text-md ml-4 opacity-50">Client: {item.client}</span>
							</div>

							<div className="ml-auto flex opacity-70">
								<Button variant="ghost" size="icon">
									<Icon icon="fontisto:more-v-a" size={18} />
								</Button>
							</div>
						</header>

						<main className="mt-4 w-full">
							<div className="my-2 flex justify-between">
								<span>
									Start Date:
									<span className="ml-2 opacity-50">{item.startDate.format("DD/MM/YYYY")}</span>
								</span>

								<span>
									Deadline:
									<span className="ml-2 opacity-50">{item.deadline.format("DD/MM/YYYY")}</span>
								</span>
							</div>
							<span className="opacity-70">{item.desc}</span>
						</main>

						<Divider />

						<footer className="flex w-full  flex-col items-center">
							<div className="mb-4 flex w-full justify-between">
								<span>
									All Hours:
									<span className="ml-2 opacity-50">{item.allHours}</span>
								</span>

								<Tag color="warning">{item.deadline.diff(dayjs(), "day")} days left</Tag>
							</div>
							<div className="flex w-full ">
								<Avatar.Group max={{ count: 4 }}>
									{item.members.map((memberAvatar) => (
										<Avatar src={memberAvatar} key={memberAvatar} />
									))}
								</Avatar.Group>
								<div className="ml-auto flex items-center opacity-50">
									<Icon icon="solar:chat-round-line-linear" size={24} />
									<span className="ml-2">{item.messages}</span>
								</div>
							</div>
						</footer>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
