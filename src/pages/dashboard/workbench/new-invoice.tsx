import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Tag } from "antd";
import Table, { type ColumnsType } from "antd/es/table";

interface DataType {
	key: string;
	id: string;
	category: string;
	price: string;
	status: string;
}

export default function NewInvoice() {
	const columns: ColumnsType<DataType> = [
		{
			title: "InvoiceId",
			dataIndex: "id",
			key: "id",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (text) => <span>{text}</span>,
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (_status) => {
				const status = _status as string;
				let color = "success";
				if (status === "Progress") color = "gold";
				if (status === "Out of Date") color = "red";
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Button variant="ghost" size="icon">
					<Icon icon="fontisto:more-v-a" />
				</Button>
			),
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			id: "INV-1990",
			category: "Android",
			price: "$83.74",
			status: "Paid",
		},
		{
			key: "2",
			id: "INV-1991",
			category: "Mac",
			price: "$97.14",
			status: "Out of Date",
		},
		{
			key: "3",
			id: "INV-1992",
			category: "Windows",
			price: "$68.71",
			status: "Progress",
		},
		{
			key: "4",
			id: "INV-1993",
			category: "Android",
			price: "$85.21",
			status: "Paid",
		},
		{
			key: "5",
			id: "INV-1994",
			category: "Mac",
			price: "$53.17",
			status: "Paid",
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>New Invoice</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea>
					<Table columns={columns} dataSource={data} />
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
