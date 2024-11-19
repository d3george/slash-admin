import { Button, Card, Flex } from "antd";
import { toast } from "sonner";

export default function ToastPage() {
	return (
		<Flex gap={16} vertical wrap>
			<Flex gap={16} wrap>
				<Card title="Simple" bordered={false} className="flex-none lg:flex-1">
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
				<Card title="Info" bordered={false} className="flex-none lg:flex-1">
					Info
				</Card>
			</Flex>

			<Flex gap={16} wrap>
				<Card title="Success" bordered={false} className="flex-none lg:flex-1">
					Success
				</Card>
				<Card title="Warning" bordered={false} className="flex-none lg:flex-1">
					Warning
				</Card>
			</Flex>
		</Flex>
	);
}
