import { themeVars } from "@/theme/theme.css";
import { Timeline, Typography } from "antd";

export default function AnalysisOrderTimeline() {
	return (
		<Timeline
			items={[
				{
					color: themeVars.colors.palette.primary.default,
					children: (
						<div className="flex flex-col">
							<Typography.Text strong>1983, orders,$4220</Typography.Text>
							<Typography.Text type="secondary" className="text-xs">
								08 Oct 2023 7:19 PM
							</Typography.Text>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.info.default,
					children: (
						<div className="flex flex-col">
							<Typography.Text strong>Order #37745 from September</Typography.Text>
							<Typography.Text type="secondary" className="text-xs">
								06 Oct 2023 5:19 PM
							</Typography.Text>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.warning.default,
					children: (
						<div className="flex flex-col">
							<Typography.Text strong>New order placed #XF-2356</Typography.Text>
							<Typography.Text type="secondary" className="text-xs">
								05 Oct 2023 4:19 PM
							</Typography.Text>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.error.default,
					children: (
						<div className="flex flex-col">
							<Typography.Text strong>New order placed #XF-2346</Typography.Text>
							<Typography.Text type="secondary" className="text-xs">
								04 Oct 2023 3:19 PM
							</Typography.Text>
						</div>
					),
				},
			]}
		/>
	);
}
