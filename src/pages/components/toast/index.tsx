import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { toast } from "sonner";

export default function ToastPage() {
	const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000));

	const handleSubmit = () => {
		toast.promise(promise, {
			loading: "Loading...",
			success: (data: any) => {
				return `${data.name} toast has been added`;
			},
			error: "Error",
		});
	};
	return (
		<div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
			<Card title="Simple" className="flex-none text- lg:flex-1 bg-">
				<CardHeader>
					<CardTitle>Simple</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<Button variant="outline" onClick={() => toast("Toast Default", {})}>
							Default
						</Button>
						<Button
							variant="ghost"
							className="bg-info!"
							onClick={() =>
								toast.info("Toast Info", {
									description: "Toast Description Info asdfdfasdfasdfasdfasdfasdfasdf",
								})
							}
						>
							Info
						</Button>
						<Button variant="ghost" className="bg-success!" onClick={() => toast.success("Toast Success")}>
							Success
						</Button>
						<Button variant="ghost" className="bg-warning!" onClick={() => toast.warning("Toast Warning")}>
							Warning
						</Button>
						<Button variant="ghost" className="bg-error!" onClick={() => toast.error("Toast Error")}>
							Error
						</Button>
					</div>
				</CardContent>
			</Card>
			<Card title="With Action">
				<CardHeader>
					<CardTitle>With Action</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<Button
							variant="outline"
							onClick={() =>
								toast("Toast Default", {
									cancel: {
										label: "Cancel",
										onClick: () => {},
									},
									action: {
										label: "Action",
										onClick: () => {},
									},
								})
							}
						>
							Default
						</Button>
						<Button
							variant="ghost"
							className="bg-info!"
							onClick={() =>
								toast.info("Toast Info", {
									action: {
										label: "Action",
										onClick: () => {},
									},
									cancel: {
										label: "Cancel",
										onClick: () => {},
									},
								})
							}
						>
							Info
						</Button>
						<Button
							variant="ghost"
							className="bg-success!"
							onClick={() =>
								toast.success("Toast Success", {
									action: {
										label: "Action",
										onClick: () => {},
									},
									cancel: {
										label: "Cancel",
										onClick: () => {},
									},
								})
							}
						>
							Success
						</Button>
						<Button
							variant="ghost"
							className="bg-warning!"
							onClick={() =>
								toast.warning("Toast Warning", {
									action: {
										label: "Action",
										onClick: () => {},
									},
									cancel: {
										label: "Cancel",
										onClick: () => {},
									},
								})
							}
						>
							Warning
						</Button>
						<Button
							variant="ghost"
							className="bg-error!"
							onClick={() =>
								toast.error("Toast Error", {
									action: {
										label: "Action",
										onClick: () => {},
									},
									cancel: {
										label: "Cancel",
										onClick: () => {},
									},
								})
							}
						>
							Error
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card title="Position">
				<CardHeader>
					<CardTitle>Position</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<Button variant="outline" onClick={() => toast.info("Toast Info", { position: "top-left" })}>
							Top Left
						</Button>
						<Button variant="outline" onClick={() => toast.info("Toast Info", { position: "top-center" })}>
							Top Center
						</Button>
						<Button variant="outline" onClick={() => toast.info("Toast Info", { position: "top-right" })}>
							Top Right
						</Button>
						<Button variant="outline" onClick={() => toast.info("Toast Info", { position: "bottom-right" })}>
							Bottom Right
						</Button>
						<Button variant="outline" onClick={() => toast.info("Toast Info", { position: "bottom-center" })}>
							Bottom Center
						</Button>
						<Button variant="outline" onClick={() => toast.info("Toast Info", { position: "bottom-left" })}>
							Bottom Left
						</Button>
					</div>
				</CardContent>
			</Card>
			<Card title="With Promise">
				<CardHeader>
					<CardTitle>With Promise</CardTitle>
				</CardHeader>
				<CardContent>
					<Button variant="outline" onClick={handleSubmit}>
						On Submit
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
