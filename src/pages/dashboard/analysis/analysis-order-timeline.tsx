import { themeVars } from "@/theme/theme.css";
import { Text } from "@/ui/typography";
import { Timeline } from "antd";

export default function AnalysisOrderTimeline() {
	return (
		<Timeline
			items={[
				{
					color: themeVars.colors.palette.primary.default,
					children: (
						<div className="flex flex-col">
							<Text variant="subTitle2">1983, orders,$4220</Text>
							<Text variant="caption" color="secondary">
								08 Oct 2023 7:19 PM
							</Text>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.info.default,
					children: (
						<div className="flex flex-col">
							<Text variant="subTitle2">Order #37745 from September</Text>
							<Text variant="caption" color="secondary">
								06 Oct 2023 5:19 PM
							</Text>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.warning.default,
					children: (
						<div className="flex flex-col">
							<Text variant="subTitle2">New order placed #XF-2356</Text>
							<Text variant="caption" color="secondary">
								05 Oct 2023 4:19 PM
							</Text>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.error.default,
					children: (
						<div className="flex flex-col">
							<Text variant="subTitle2">New order placed #XF-2346</Text>
							<Text variant="caption" color="secondary">
								04 Oct 2023 3:19 PM
							</Text>
						</div>
					),
				},
			]}
		/>
	);
}
