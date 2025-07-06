import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { AvatarGroup } from "@/components/avatar-group";
import { Icon } from "@/components/icon";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Text } from "@/ui/typography";
import { faker } from "@faker-js/faker";
import { type CSSProperties, useState } from "react";

export default function NoticeButton() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [count, setCount] = useState(4);

	const style: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50%, 50%",
	};

	return (
		<>
			<div className="relative" onClick={() => setDrawerOpen(true)}>
				<Button variant="ghost" size="icon" className="rounded-full" onClick={() => setDrawerOpen(true)}>
					<Icon icon="solar:bell-bing-bold-duotone" size={24} />
				</Button>
				<Badge variant="destructive" shape="circle" className="absolute -right-2 -top-2">
					{count}
				</Badge>
			</div>
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side="right" className="sm:max-w-md p-0 [&>button]:hidden flex flex-col" style={style}>
					<SheetHeader className="flex flex-row items-center justify-between p-4 h-16 shrink-0">
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
					<div className="px-4 flex-1 overflow-hidden">
						<NoticeTab />
					</div>
					<SheetFooter className="flex flex-row h-16 w-full items-center justify-between p-4 shrink-0">
						<Button variant="outline" className="flex-1 mr-2">
							Archive all
						</Button>
						<Button className="flex-1 ml-2">Mark all as read</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}

function NoticeTab() {
	const allNotifications = [
		{
			id: 1,
			type: "mention",
			user: "Joe Lincoln",
			action: "mentioned you in",
			target: "Latest Trends",
			targetType: "topic",
			time: "18 mins ago",
			department: "Web Design 2024",
			message: "@Cody For an expert opinion, check out what Mike has to say on this topic!",
			hasReply: true,
			hasAvatar: true,
		},
		{
			id: 2,
			type: "tags",
			user: "Leslie Alexander",
			action: "added new tags to",
			target: "Web Redesign 2024",
			time: "53 mins ago",
			department: "ACME",
			tags: ["Client-Request", "Figma", "Redesign"],
			hasAvatar: true,
		},
		{
			id: 3,
			type: "access",
			user: "Guy Hawkins",
			action: "requested access to",
			target: "AirSpace",
			targetType: "project",
			time: "14 hours ago",
			department: "Dev Team",
			hasActions: true,
			hasAvatar: true,
		},
		{
			id: 4,
			type: "file",
			user: "Jane Perez",
			action: "invites you to review a file.",
			time: "3 hours ago",
			fileSize: "742kb",
			fileName: "Launch_nov24.pptx",
			fileType: "ppt",
			editedTime: "39 mins ago",
			hasAvatar: true,
		},
		{
			id: 5,
			type: "article",
			user: "Raymond Pawell",
			action: "posted a new article",
			target: "2024 Roadmap",
			time: "1 hour ago",
			department: "Roadmap",
			hasAvatar: true,
		},
		{
			id: 6,
			type: "project",
			user: "Tyler Hero",
			action: "wants to view your design project",
			time: "3 day ago",
			department: "Metronic Launcher mockups",
			fileName: "Launcher-UIkit.fig",
			fileType: "figma",
			editedTime: "2 mins ago",
			hasAvatar: true,
		},
	];

	const inboxNotifications = [
		{
			id: 1,
			type: "user_request",
			user: "Samuel Lee",
			action: "requested to add user to",
			target: "TechSynergy",
			time: "22 hours ago",
			department: "Dev Team",
			userEmail: "ronald.richards@gmail.com",
			userName: "Ronald Richards",
			hasActions: true,
			hasAvatar: true,
		},
		{
			id: 2,
			type: "success",
			message: "You have successfully verified your account",
			time: "2 days ago",
			isSuccess: true,
		},
		{
			id: 3,
			type: "file",
			user: "Ava Peterson",
			action: "uploaded attachment",
			time: "3 days ago",
			department: "ACME",
			fileName: "Redesign-2024.xls",
			fileSize: "2.6 MB",
			fileType: "excel",
			hasAvatar: true,
		},
		{
			id: 4,
			type: "task",
			user: "Ethan Parker",
			action: "created a new tasks to",
			target: "Site Sculpt",
			targetType: "project",
			time: "3 days ago",
			department: "Web Designer",
			taskTitle: "Location history is erased after Logging In",
			dueDate: "15 May, 2024",
			tags: ["Improvement", "Bug"],
			assignees: 2,
			hasAvatar: true,
		},
		{
			id: 5,
			type: "upgrade",
			user: "Benjamin Harris",
			action: "requested to upgrade plan",
			time: "4 days ago",
			department: "Marketing",
			hasActions: true,
			hasAvatar: true,
		},
		{
			id: 6,
			type: "mention",
			user: "Isaac Morgan",
			action: "mentioned you in",
			target: "Data Transmission",
			targetType: "topic",
			time: "6 days ago",
			department: "Dev Team",
			hasAvatar: true,
		},
	];

	const teamNotifications = [
		{
			id: 1,
			type: "meeting",
			user: "Nova Hawthorne",
			action: "sent you an meeting invitation",
			time: "2 days ago",
			department: "Dev Team",
			meetingTitle: "Preparation For Release",
			meetingTime: "9:00 PM - 10:00 PM",
			meetingDate: "Apr 12",
			attendees: 7,
			hasActions: true,
			hasAvatar: true,
		},
		{
			id: 2,
			type: "article",
			user: "Adrian Vale",
			action: "posted a new article",
			target: "Marketing",
			targetDate: "13 May",
			time: "2 days ago",
			department: "Marketing",
			hasAvatar: true,
		},
		{
			id: 3,
			type: "upload",
			user: "Skylar Frost",
			action: "uploaded 2 attachments",
			time: "3 days ago",
			department: "Web Design",
			files: [
				{ name: "Landing-page.docx", size: "1.9 MB", type: "word" },
				{ name: "New-icon.svg", size: "2.3 MB", type: "svg" },
			],
			hasAvatar: true,
		},
		{
			id: 4,
			type: "comment",
			user: "Selene Silverleaf",
			action: "commented on",
			target: "SiteSculpt",
			time: "4 days ago",
			department: "Manager",
			message: "@Cody This design is simply stunning! From layout to color, it's a work of art!",
			hasReply: true,
			hasAvatar: true,
		},
		{
			id: 5,
			type: "invitation",
			user: "Thalia Fox",
			action: "has invited you to join",
			target: "Design Research",
			time: "4 days ago",
			department: "Dev Team",
			hasActions: true,
			hasAvatar: true,
		},
	];

	const renderNotification = (notification: any) => {
		const getFileIcon = (type: string) => {
			switch (type) {
				case "ppt":
					return "local:file-ppt";
				case "excel":
					return "local:file-excel";
				case "word":
					return "local:file-word";
				case "svg":
					return "local:file-img";
				case "figma":
					return "local:file-psd";
				default:
					return "local:file";
			}
		};

		const getTagColor = (tag: string) => {
			switch (tag) {
				case "Client-Request":
					return "bg-purple-100 text-purple-700";
				case "Figma":
					return "bg-orange-100 text-orange-700";
				case "Redesign":
					return "bg-gray-100 text-gray-700";
				case "Improvement":
					return "bg-green-100 text-green-700";
				case "Bug":
					return "bg-red-100 text-red-700";
				default:
					return "bg-gray-100 text-gray-700";
			}
		};

		return (
			<div key={notification.id} className="flex items-start space-x-3 py-4 border-b border-border last:border-b-0">
				{notification.hasAvatar ? (
					<div className="relative">
						<div className="w-10 h-10 rounded-full bg-bg-neutral flex items-center justify-center text-sm font-medium">
							CH
						</div>
						<div className="absolute bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2" />
					</div>
				) : notification.isSuccess ? (
					<div className="w-10 h-10 rounded-full bg-bg-neutral flex items-center justify-center">
						<Badge shape="circle" variant="success">
							<Icon icon="solar:check-circle-bold" size={20} />
						</Badge>
					</div>
				) : null}

				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between">
						<div className="flex-1">
							{notification.type === "success" || notification.type === "view_allowed" ? (
								<Text>{notification.message || notification.status}</Text>
							) : (
								<Text variant="subTitle2">
									<Text variant="subTitle2">{notification.user}</Text>
									<Text variant="subTitle2" color="secondary">
										{" "}
										{notification.action}{" "}
									</Text>
									{notification.target && (
										<Text variant="subTitle2" color="primary">
											{notification.target}
										</Text>
									)}
									{notification.targetType && (
										<Text variant="subTitle2" color="secondary">
											{" "}
											{notification.targetType}
										</Text>
									)}
									{notification.targetDate && (
										<Text variant="subTitle2" color="secondary">
											{" "}
											to {notification.targetDate}
										</Text>
									)}
								</Text>
							)}
							<div className="flex items-center space-x-2 mt-1">
								<Text variant="subTitle2" color="secondary">
									{notification.time}
								</Text>
								{notification.department && (
									<>
										<Text variant="caption" color="secondary">
											•
										</Text>
										<Text variant="caption" color="secondary">
											{notification.department}
										</Text>
									</>
								)}
							</div>
						</div>
					</div>

					{/* Message */}
					{notification.message && notification.type !== "success" && (
						<div className="mt-3 p-3 bg-bg-neutral rounded-lg">
							<Text variant="caption">{notification.message}</Text>
						</div>
					)}

					{/* User Request */}
					{notification.type === "user_request" && (
						<div className="mt-3 p-3 bg-bg-neutral rounded-lg">
							<div className="flex items-center justify-between">
								<div>
									<Text variant="subTitle2">{notification.userName}</Text>
									<Text variant="caption" color="secondary">
										{notification.userEmail}
									</Text>
								</div>
								<Button variant="outline" size="sm">
									Go to profile
								</Button>
							</div>
						</div>
					)}

					{/* Meeting */}
					{notification.type === "meeting" && (
						<div className="mt-3 p-4 bg-bg-neutral rounded-lg">
							<div className="flex items-center justify-between">
								<div>
									<div className="flex items-center space-x-4">
										<div className="text-center">
											<Badge variant="warning">{notification.meetingDate.split(" ")[0]}</Badge>
											<div className="text-lg font-bold mt-1">
												<Text variant="subTitle2">{notification.meetingDate.split(" ")[1]}</Text>
											</div>
										</div>
										<div className="flex flex-col">
											<Text variant="subTitle2">{notification.meetingTitle}</Text>
											<Text variant="caption" color="secondary">
												{notification.meetingTime}
											</Text>
										</div>
									</div>
								</div>
								<AvatarGroup max={{ count: 4 }} size="small">
									{Array.from({ length: notification.attendees }).map((_, i) => (
										<Avatar key={`attendee-${notification.id}-${i}`}>
											<AvatarImage src={faker.image.avatarGitHub()} />
										</Avatar>
									))}
								</AvatarGroup>
							</div>
						</div>
					)}

					{/* File */}
					{notification.fileName && (
						<div className="mt-3 p-3 bg-bg-neutral rounded-lg flex items-center space-x-3">
							<Icon icon={getFileIcon(notification.fileType)} size={32} />
							<div className="flex-1">
								<Text variant="subTitle2">{notification.fileName}</Text>
								<Text variant="caption" color="secondary">
									{notification.fileSize}
									{notification.editedTime && ` • Edited ${notification.editedTime}`}
								</Text>
							</div>
							<Button variant="outline" size="sm">
								<Icon icon="solar:download-linear" size={16} />
							</Button>
						</div>
					)}

					{/* Multiple Files */}
					{notification.files && (
						<div className="mt-3 space-y-2">
							{notification.files.map((file: any) => (
								<div key={file.name} className="p-3 bg-bg-neutral rounded-lg flex items-center space-x-3">
									<Icon icon={getFileIcon(file.type)} size={32} />
									<div className="flex-1">
										<Text variant="subTitle2">{file.name}</Text>
										<Text variant="caption" color="secondary">
											{file.size}
										</Text>
									</div>
									<Button variant="outline" size="sm">
										<Icon icon="solar:download-linear" size={16} />
									</Button>
								</div>
							))}
						</div>
					)}

					{/* Artworks */}
					{notification.artworks && (
						<div className="mt-3 grid grid-cols-2 gap-3">
							{notification.artworks.map((artwork: any) => (
								<div key={artwork.id} className="relative">
									<div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg" />
									<div className="mt-2">
										<Text variant="subTitle2">{artwork.title}</Text>
										<Text variant="caption" color="secondary">
											Token ID: {artwork.id}
										</Text>
									</div>
								</div>
							))}
						</div>
					)}

					{/* Tags */}
					{notification.tags && (
						<div className="mt-3 flex flex-wrap gap-2">
							{notification.tags.map((tag: string) => (
								<Badge key={tag} variant="default">
									{tag}
								</Badge>
							))}
						</div>
					)}

					{/* Task */}
					{notification.taskTitle && (
						<div className="mt-3 p-3 bg-bg-neutral rounded-lg">
							<div className="flex items-center justify-between">
								<div className="flex-1">
									<Text variant="subTitle2">{notification.taskTitle}</Text>
									<Text variant="caption" color="secondary">
										Due Date: {notification.dueDate}
									</Text>
									<div className="flex items-center space-x-2 mt-2">
										{notification.tags?.map((tag: string) => (
											<span key={tag} className={`px-2 py-1 rounded-full text-xs ${getTagColor(tag)}`}>
												{tag}
											</span>
										))}
									</div>
								</div>
								<div className="flex -space-x-2">
									{Array.from({ length: notification.assignees }).map((_, i) => (
										<div
											key={`attendee-${notification.id}-${i}`}
											className="w-6 h-6 rounded-full bg-bg-neutral border-2"
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Actions */}
					{notification.hasActions && (
						<div className="mt-3 flex space-x-2">
							<Button size="sm">
								{notification.type === "access"
									? "Accept"
									: notification.type === "user_request"
										? "Accept"
										: notification.type === "meeting"
											? "Accept"
											: notification.type === "upgrade"
												? "Accept"
												: notification.type === "invitation"
													? "Accept"
													: notification.type === "edit_request"
														? "Accept"
														: "Accept"}
							</Button>
							<Button variant="outline" size="sm">
								{notification.type === "access"
									? "Decline"
									: notification.type === "user_request"
										? "Decline"
										: notification.type === "meeting"
											? "Decline"
											: notification.type === "upgrade"
												? "Decline"
												: notification.type === "invitation"
													? "Decline"
													: notification.type === "edit_request"
														? "Decline"
														: "Decline"}
							</Button>
						</div>
					)}

					{/* Reply */}
					{notification.hasReply && (
						<div className="mt-3">
							<div className="flex items-center space-x-2">
								<Input placeholder="Reply " />
								<Button variant="ghost" size="sm">
									<Icon icon="solar:gallery-linear" size={16} />
								</Button>
							</div>
						</div>
					)}

					{/* Profile Action */}
					{notification.hasProfileAction && (
						<div className="mt-3 flex items-center space-x-2">
							<div className="flex items-center space-x-2 text-sm text-gray-600">
								<Icon icon="solar:check-circle-bold" size={16} className="text-green-600" />
								<span>Connected</span>
							</div>
							<Button variant="outline" size="sm">
								Go to profile
							</Button>
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<Tabs defaultValue="all" className="w-full h-full flex flex-col">
			<TabsList className="gap-2 w-full flex justify-between items-center shrink-0">
				<TabsTrigger value="all" className="flex items-center gap-1">
					<span>All</span>
					<Badge variant="default">{allNotifications.length}</Badge>
				</TabsTrigger>
				<TabsTrigger value="inbox" className="flex items-center gap-1">
					<span>Inbox</span>
					<Badge variant="info">{inboxNotifications.length}</Badge>
				</TabsTrigger>
				<TabsTrigger value="team" className="flex items-center gap-1">
					<span>Team</span>
					<Badge variant="success">{teamNotifications.length}</Badge>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="all" className="flex-1 overflow-hidden">
				<ScrollArea className="h-full">
					<div className="space-y-0">{allNotifications.map(renderNotification)}</div>
				</ScrollArea>
			</TabsContent>

			<TabsContent value="inbox" className="flex-1 overflow-hidden">
				<ScrollArea className="h-full">
					<div className="space-y-0">{inboxNotifications.map(renderNotification)}</div>
				</ScrollArea>
			</TabsContent>

			<TabsContent value="team" className="flex-1 overflow-hidden">
				<ScrollArea className="h-full">
					<div className="space-y-0">{teamNotifications.map(renderNotification)}</div>
				</ScrollArea>
			</TabsContent>
		</Tabs>
	);
}
