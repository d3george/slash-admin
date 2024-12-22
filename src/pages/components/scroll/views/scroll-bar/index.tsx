import { faker } from "@faker-js/faker";
import { Card, Col, Row, Typography } from "antd";

import Scrollbar from "@/components/scrollbar";
import { themeVars } from "@/theme/theme.css";

const TEXT = faker.lorem.paragraphs({ min: 20, max: 30 });
export default function ScrollbarView() {
	return (
		<>
			<Typography.Link
				href="https://grsmto.github.io/simplebar/"
				style={{ color: themeVars.colors.palette.primary.default }}
				className="mb-4 block"
			>
				https://grsmto.github.io/simplebar/
			</Typography.Link>
			<Row gutter={[16, 16]} justify="center">
				<Col span={23} lg={12}>
					<Card title="Vertical">
						<div style={{ height: "420px" }}>
							<Scrollbar>{TEXT}</Scrollbar>
						</div>
					</Card>
				</Col>
				<Col span={23} lg={12}>
					<Card title="Horizontal">
						<Scrollbar>
							<div style={{ width: "200%" }}>{TEXT}</div>
						</Scrollbar>
					</Card>
				</Col>
			</Row>
		</>
	);
}
