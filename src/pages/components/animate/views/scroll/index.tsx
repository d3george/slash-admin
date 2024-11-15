import { Card, Col, Row } from "antd";
import { useMemo, useState } from "react";

import ControlPanel from "../../control-panel";

import ContainerView from "./container";
import Toolbar from "./toolbar";

export default function ScrollView() {
	const defaultValue = useMemo(() => {
		return {
			selectedVariant: "slideInUp",
		};
	}, []);
	const [selectedVariant, setSelectedVariant] = useState(
		defaultValue.selectedVariant,
	);

	const onRefresh = () => {
		setSelectedVariant(defaultValue.selectedVariant);
	};
	return (
		<Card>
			<Row>
				<Col xs={24} md={18}>
					<Toolbar onRefresh={onRefresh} />
				</Col>
			</Row>
			<Row justify="space-between">
				<Col xs={24} md={18}>
					<ContainerView variant={selectedVariant} />
				</Col>
				<Col xs={24} md={5}>
					<ControlPanel
						variantKey={variantKey}
						selectedVariant={selectedVariant}
						onChangeVarient={(varient) => setSelectedVariant(varient)}
					/>
				</Col>
			</Row>
		</Card>
	);
}

const variantKey = [
	{
		type: "slide",
		values: ["slideInUp", "slideInDown", "slideInLeft", "slideInRight"],
	},
	{
		type: "fade",
		values: ["fadeIn", "fadeInUp", "fadeInDown", "fadeInLeft", "fadeInRight"],
	},
	{
		type: "zoom",
		values: ["zoomIn", "zoomInUp", "zoomInDown", "zoomInLeft", "zoomInRight"],
	},
	{
		type: "bounce",
		values: [
			"bounceIn",
			"bounceInUp",
			"bounceInDown",
			"bounceInLeft",
			"bounceInRight",
		],
	},
	{
		type: "flip",
		values: ["flipInX", "flipInY"],
	},
	{
		type: "scale",
		values: ["scaleInX", "scaleInY"],
	},
	{
		type: "rotate",
		values: ["rotateIn"],
	},
];
