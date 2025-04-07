import { Iconify } from "@/components/icon";

export const NAV_SECTION_ITEMS = [
	{
		name: "Marketing",
		items: [
			{
				title: "Landing aaaaaaaaaaaaa",
				path: "#",
				roles: ["admin"],
				caption: "Display only admin role       aaaaaaaaaaaaaaa",
				info: <span className="text-xs text-text-secondary bg-success px-1.5 py-0.5 rounded-md">+2</span>,
				children: [
					{
						title: "Item 1",
						path: "#",
						caption: "Display caption",
						info: <span className="text-xs text-text-secondary">+2</span>,
					},
					{ title: "Item 2", path: "#" },
				],
			},
			{
				title: "Services",
				path: "#",
				icon: <Iconify icon="solar:star-line-duotone" size={18} />,
				roles: ["admin", "user"],
			},
			{
				title: "Blog",
				path: "#",
				icon: <Iconify icon="solar:star-line-duotone" size={18} />,
				info: "+3",
				children: [
					{
						title: "Item 1",
						path: "#",
						caption: "Display caption",
						info: "+2",
					},
					{ title: "Item 2", path: "#" },
				],
			},
		],
	},
	{
		name: "Travel",
		items: [
			{
				title: "About",
				path: "#",
				icon: <Iconify icon="solar:star-line-duotone" size={18} />,
				info: "+4",
			},
			{
				title: "Contact",
				path: "#",
				icon: <Iconify icon="solar:star-line-duotone" size={18} />,
				disabled: true,
			},
			{
				title: "Level",
				path: "/components",
				icon: <Iconify icon="solar:star-line-duotone" size={18} />,
				children: [
					{
						title: "Level 2a",
						path: "/components/extra",
						icon: <Iconify icon="solar:star-line-duotone" size={18} />,
						caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
						children: [
							{ title: "Level 3a", path: "#" },
							{
								title: "Level 3b",
								path: "/components/extra/navigation-bar",
								children: [
									{ title: "Level 4a", path: "#", disabled: true },
									{ title: "Level 4b", path: "/components/extra/navigation-bar" },
								],
							},
							{ title: "Level 3c", path: "#" },
						],
					},
					{
						title: "Level 2b",
						path: "#",
						icon: <Iconify icon="solar:star-line-duotone" size={18} />,
					},
					{
						title: "Level 2c",
						path: "#",
						icon: <Iconify icon="solar:star-line-duotone" size={18} />,
					},
				],
			},
			{
				title: "More",
				path: "#",
				icon: <Iconify icon="solar:star-line-duotone" size={18} />,
			},
		],
	},
];
