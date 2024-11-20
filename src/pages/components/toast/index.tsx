import { Button, Card, Flex } from "antd";
import { toast } from "sonner";

export default function ToastPage() {
	const promise = () =>
		new Promise((resolve) =>
			setTimeout(() => resolve({ name: "Sonner" }), 2000),
		);

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
		<Flex gap={16} vertical wrap>
			<Flex gap={16} wrap>
				<Card
					title="Simple"
					bordered={false}
					className="flex-none text- lg:flex-1 bg-"
				>
					<Flex gap={16} wrap>
						<Button
							color="default"
							variant="solid"
							onClick={() => toast("Toast Default", {})}
						>
							Default
						</Button>
						<Button
							color="default"
							className="!bg-info"
							variant="solid"
							onClick={() =>
								toast.info("Toast Info", {
									description:
										"Toast Description Info asdfdfasdfasdfasdfasdfasdfasdf",
								})
							}
						>
							Info
						</Button>
						<Button
							color="default"
							className="!bg-success"
							variant="solid"
							onClick={() => toast.success("Toast Success")}
						>
							Success
						</Button>
						<Button
							color="default"
							className="!bg-warning"
							variant="solid"
							onClick={() => toast.warning("Toast Warning")}
						>
							Warning
						</Button>
						<Button
							color="default"
							className="!bg-error"
							variant="solid"
							onClick={() => toast.error("Toast Error")}
						>
							Error
						</Button>
					</Flex>
				</Card>
				<Card
					title="With Action"
					bordered={false}
					className="flex-none lg:flex-1"
				>
					<Flex gap={16} wrap>
						<Button
							color="default"
							variant="solid"
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
							color="default"
							className="!bg-info"
							variant="solid"
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
							color="default"
							className="!bg-success"
							variant="solid"
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
							color="default"
							className="!bg-warning"
							variant="solid"
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
							color="default"
							className="!bg-error"
							variant="solid"
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
					</Flex>
				</Card>
			</Flex>

			<Flex gap={16} wrap>
				<Card title="Position" bordered={false} className="flex-none lg:flex-1">
					<Flex gap={16} wrap>
						<Button
							onClick={() => toast.info("Toast Info", { position: "top-left" })}
						>
							Top Left
						</Button>
						<Button
							onClick={() =>
								toast.info("Toast Info", { position: "top-center" })
							}
						>
							Top Center
						</Button>
						<Button
							onClick={() =>
								toast.info("Toast Info", { position: "top-right" })
							}
						>
							Top Right
						</Button>
						<Button
							onClick={() =>
								toast.info("Toast Info", { position: "bottom-right" })
							}
						>
							Bottom Right
						</Button>
						<Button
							onClick={() =>
								toast.info("Toast Info", { position: "bottom-center" })
							}
						>
							Bottom Center
						</Button>
						<Button
							onClick={() =>
								toast.info("Toast Info", { position: "bottom-left" })
							}
						>
							Bottom Left
						</Button>
					</Flex>
				</Card>
				<Card
					title="With Promise"
					bordered={false}
					className="flex-none lg:flex-1"
				>
					<Flex gap={16} justify="center" align="center" wrap>
						<Button onClick={handleSubmit}>On Submit</Button>
					</Flex>
				</Card>
			</Flex>
		</Flex>
	);
}
