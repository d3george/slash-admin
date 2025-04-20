import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Switch } from "@/ui/switch";
import { toast } from "sonner";

export default function NotificationsTab() {
	const handleClick = () => {
		toast.success("Update success!");
	};
	return (
		<Card>
			<CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="flex-1">
					<h4>Activity</h4>
					<p className="text-text-secondary">Donec mi odio, faucibus at, scelerisque quis</p>
				</div>
				<div className="flex-2">
					<div className="flex w-full flex-col gap-4 rounded-lg px-6 py-8 bg-bg-neutral">
						<div className="flex w-full justify-between">
							<div>Email me when someone answers on my form</div>
							<Switch defaultChecked />
						</div>
						<div className="flex w-full justify-between">
							<div>Email me when someone comments onmy article</div>
							<Switch />
						</div>
						<div className="flex w-full justify-between">
							<div>Email me hen someone follows me</div>
							<Switch defaultChecked />
						</div>
					</div>
				</div>

				<div className="flex-1">
					<h4>Applications</h4>
					<p className="text-text-secondary">Donec mi odio, faucibus at, scelerisque quis</p>
				</div>
				<div className="flex-2">
					<div className="flex w-full flex-col gap-4 rounded-lg px-6 py-8 bg-bg-neutral">
						<div className="flex w-full justify-between">
							<div>News and announcements</div>
							<Switch />
						</div>
						<div className="flex w-full justify-between">
							<div>Weekly product updates</div>
							<Switch defaultChecked />
						</div>
						<div className="flex w-full justify-between">
							<div>Weekly blog digest</div>
							<Switch />
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex w-full justify-end">
				<Button onClick={handleClick}>Save Changes</Button>
			</CardFooter>
		</Card>
	);
}
