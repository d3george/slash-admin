import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { faker } from "@faker-js/faker";
import { Checkbox, List } from "antd";

export default function AnalysisTasks() {
	const data = [
		{
			task: faker.lorem.words(),
			checked: false,
		},
		{
			task: faker.lorem.words(),
			checked: true,
		},
		{
			task: faker.lorem.words(),
			checked: false,
		},
		{
			task: faker.lorem.words(),
			checked: false,
		},
	];
	return (
		<List
			size="small"
			dataSource={data}
			renderItem={(item) => (
				<List.Item
					actions={[
						<Button key={item.task} variant="ghost" size="icon">
							<Icon icon="fontisto:more-v-a" />
						</Button>,
					]}
				>
					<Checkbox
						onChange={(e) => {
							item.checked = e.target.checked;
						}}
					>
						{item.task}
					</Checkbox>
				</List.Item>
			)}
		/>
	);
}
