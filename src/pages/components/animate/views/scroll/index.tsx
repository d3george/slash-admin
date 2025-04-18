import { Card, CardContent, CardHeader } from "@/ui/card";
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
	const [selectedVariant, setSelectedVariant] = useState(defaultValue.selectedVariant);

	const onRefresh = () => {
		setSelectedVariant(defaultValue.selectedVariant);
	};
	return (
		<Card>
			<CardHeader>
				<Toolbar onRefresh={onRefresh} />
			</CardHeader>
			<CardContent>
				<div className="flex md:flex-row flex-col gap-2">
					<div className="flex-3">
						<ContainerView variant={selectedVariant} />
					</div>
					<div className="flex-1">
						<ControlPanel
							variantKey={variantKey}
							selectedVariant={selectedVariant}
							onChangeVarient={(varient) => setSelectedVariant(varient)}
						/>
					</div>
				</div>
			</CardContent>
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
		values: ["bounceIn", "bounceInUp", "bounceInDown", "bounceInLeft", "bounceInRight"],
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
