import { Card, CardContent, CardHeader } from "@/ui/card";
import { useMemo, useState } from "react";
import ControlPanel from "../../control-panel";
import ContainerView from "./container";
import Toolbar from "./toolbar";

export default function BackgroundView() {
	const defaultValue = useMemo(() => {
		return {
			selectedVariant: "kenburnsTop",
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
		type: "kenburns",
		values: ["kenburnsTop", "kenburnsBottom", "kenburnsLeft", "kenburnsRight"],
	},
	{
		type: "pan",
		values: ["panTop", "panBottom", "panLeft", "panRight"],
	},
	{
		type: "color change",
		values: ["color2x", "color3x", "color4x", "color5x"],
	},
];
