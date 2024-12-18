import { faker } from "@faker-js/faker";
import { Avatar, Col, Row, Tag } from "antd";

import { fakeAvatars } from "@/_mock/utils";
import Card from "@/components/card";
import { IconButton, Iconify } from "@/components/icon";

export default function TeamsTab() {
	const items = [
		{
			icon: <Iconify icon="logos:react" size={40} />,
			name: "React Developers",
			desc: "We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.",
			members: fakeAvatars(25),
			tags: ["React", "AntD"],
		},
		{
			icon: <Iconify icon="logos:vue" size={40} />,
			name: "Vue.js Dev Team",
			desc: "The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.",
			members: fakeAvatars(20),
			tags: ["Vue.js", "Developer"],
		},
		{
			icon: <Iconify icon="logos:figma" size={40} />,
			name: "Figma Resources",
			desc: "Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.",
			members: fakeAvatars(45),
			tags: ["UI/UX", "Figma"],
		},
		{
			icon: <Iconify icon="logos:html-5" size={40} />,
			name: "Only Beginners",
			desc: "Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and…",
			members: fakeAvatars(50),
			tags: ["CSS", "HTML"],
		},
		{
			icon: <Iconify icon="logos:adobe-xd" size={40} />,
			name: "Creative Designers",
			desc: "A design or product team is more than just the people on it. A team includes the people, the roles they play.  ",
			members: fakeAvatars(55),
			tags: ["Sketch", "XD"],
		},
	];
	return (
		<Row gutter={[16, 16]}>
			{items.map((item) => (
				<Col span={24} md={12} key={item.name}>
					<Card className="w-full flex-col">
						<header className="flex w-full items-center">
							{item.icon}
							<span className="ml-4 text-xl opacity-70">{item.name}</span>

							<div className="ml-auto flex opacity-70">
								<IconButton>
									<Iconify icon="solar:star-line-duotone" size={18} />
								</IconButton>
								<IconButton>
									<Iconify icon="fontisto:more-v-a" size={18} />
								</IconButton>
							</div>
						</header>
						<main className="my-4 opacity-70">{item.desc}</main>
						<footer className="flex w-full items-center">
							<Avatar.Group max={{ count: 4 }}>
								{item.members.map((memberAvatar) => (
									<Avatar src={memberAvatar} key={memberAvatar} />
								))}
							</Avatar.Group>
							<div className="ml-auto flex items-center">
								{item.tags.map((tag) => (
									<Tag color={faker.color.rgb()} key={tag}>
										{tag}
									</Tag>
								))}
							</div>
						</footer>
					</Card>
				</Col>
			))}
		</Row>
	);
}
