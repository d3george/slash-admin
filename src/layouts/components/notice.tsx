import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { Icon } from "@/components/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { faker } from "@faker-js/faker";
import { type CSSProperties, type ReactNode, useState } from "react";

export default function NoticeButton() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [count, setCount] = useState(4);

	const style: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50, 50%",
	};

	return (
		<div>
			<div className="relative">
				<Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDrawerOpen(true)}>
					<Icon icon="solar:bell-bing-bold-duotone" size={24} />
				</Button>
				<Badge variant="destructive" overlay="circle" className="absolute -right-2 -top-2">
					{count}
				</Badge>
			</div>
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side="right" className="w-[420px] p-0 [&>button]:hidden" style={style}>
					<SheetHeader className="flex flex-row items-center justify-between px-6 py-4">
						<SheetTitle>Notifications</SheetTitle>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full text-primary"
							onClick={() => {
								setCount(0);
								setDrawerOpen(false);
							}}
						>
							<Icon icon="solar:check-read-broken" size={20} />
						</Button>
					</SheetHeader>
					<NoticeTab />
					<SheetFooter className="border-t">
						<div style={{ color: themeVars.colors.text.primary }} className="flex h-10 w-full items-center justify-center font-semibold">
							View All
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}

function NoticeTab() {
	const tabChildren: ReactNode = (
		<div className="text-sm">
			<div className="flex">
				<img className="h-10 w-10 rounded-full" src={faker.image.avatarGitHub()} alt="" />
				<div className="ml-2">
					<div>
						<span className="font-medium">{faker.person.fullName()}</span>
						<span className="text-xs font-light"> sent you a frind request</span>
					</div>
					<span className="text-xs font-light opacity-60">about 1 hour ago</span>
					<div className="mt-2 flex gap-2">
						<Button>Accept</Button>
						<Button variant="outline">Refuse</Button>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<img className="h-10 w-10 rounded-full" src={faker.image.avatarGitHub()} alt="" />
				<div className="ml-2">
					<div>
						<span className="font-medium">{faker.person.fullName()}</span>
						<span className="text-xs font-light"> added file to </span>
						<span className="font-medium">File Manager</span>
					</div>
					<span className="text-xs font-light opacity-60">5 hour ago</span>
					<div className="mt-2 flex items-center rounded-lg bg-bg-neutral p-4">
						<div className="ml-2 flex flex-col text-gray">
							<span className="font-medium">@{faker.person.fullName()}</span>
							<span className="text-xs">{faker.lorem.lines(2)}</span>
						</div>
					</div>
					<div className="mt-2">
						<Button>Reply</Button>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<img className="h-10 w-10 rounded-full" src={faker.image.avatarGitHub()} alt="" />
				<div className="ml-2">
					<div>
						<span className="font-medium">{faker.person.fullName()}</span>
						<span className="text-xs font-light"> mentioned you in</span>
						<span className="font-medium">{GLOBAL_CONFIG.appName}</span>
					</div>
					<span className="text-xs font-light opacity-60">1 days ago</span>
					<div className="mt-2">
						<Button>Reply</Button>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<img className="h-10 w-10 rounded-full" src={faker.image.avatarGitHub()} alt="" />
				<div className="ml-2">
					<div>
						<span className="font-medium">{faker.person.fullName()}</span>
						<span className="text-xs font-light"> added file to </span>
						<span className="font-medium">File Manager</span>
					</div>
					<span className="text-xs font-light opacity-60">2 days ago</span>
					<div className="mt-2 flex items-center rounded-lg bg-bg-neutral p-4">
						<Icon icon="local:ic-file-audio" size={48} />
						<div className="ml-2 flex flex-col text-gray">
							<span className="font-medium">Witout Me</span>
							<span className="text-xs">1.2GB·30 min ago </span>
						</div>
						<Button variant="outline" className="ml-4">
							Download
						</Button>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<img className="h-10 w-10 rounded-full" src={faker.image.avatarGitHub()} alt="" />
				<div className="ml-2">
					<div>
						<span className="font-medium">{faker.person.fullName()}</span>
						<span className="text-xs font-light"> request a payment of </span>
						<span className="font-medium">$3000</span>
					</div>
					<span className="text-xs font-light opacity-60">4 days ago</span>
					<div className="mt-2 flex gap-2">
						<Button>Pay</Button>
						<Button variant="outline">Refuse</Button>
					</div>
				</div>
			</div>

			<div className="mt-8 flex">
				<Icon icon="local:ic-order" size={40} />
				<div className="ml-2">
					<div>
						<span className="font-light">Your order is placed waiting for shipping</span>
					</div>
					<span className="text-xs font-light opacity-60">4 days ago</span>{" "}
				</div>
			</div>

			<div className="mt-8 flex">
				<Icon icon="local:ic-mail" size={40} />
				<div className="ml-2">
					<div>
						<span className="font-light">You have new mail</span>
					</div>
					<span className="text-xs font-light opacity-60">5 days ago</span>{" "}
				</div>
			</div>

			<div className="mt-8 flex">
				<Icon icon="local:ic-chat" size={40} />
				<div className="ml-2">
					<div>
						<span className="font-light">You have new message 5 unread message</span>
					</div>
					<span className="text-xs font-light opacity-60">7 days ago</span>
				</div>
			</div>

			<div className="mt-8 flex">
				<Icon icon="local:ic-delivery" size={40} />
				<div className="ml-2">
					<div>
						<span className="font-light">Delivery processing your order is being shipped</span>
					</div>
					<span className="text-xs font-light opacity-60">8 days ago</span>{" "}
				</div>
			</div>
		</div>
	);

	return (
		<div className="flex flex-col px-6">
			<Tabs defaultValue="all" className="w-full">
				<TabsList>
					<TabsTrigger value="all" className="flex gap-1">
						<span>All</span>
						<Badge variant="info">22</Badge>
					</TabsTrigger>
					<TabsTrigger value="unread" className="flex gap-1">
						<span>Unread</span>
						<Badge variant="error">12</Badge>
					</TabsTrigger>
					<TabsTrigger value="archived" className="flex gap-1">
						<span>Archived</span>
						<Badge variant="success">10</Badge>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="all">{tabChildren}</TabsContent>
				<TabsContent value="unread">{tabChildren}</TabsContent>
				<TabsContent value="archived">{tabChildren}</TabsContent>
			</Tabs>
		</div>
	);
}
