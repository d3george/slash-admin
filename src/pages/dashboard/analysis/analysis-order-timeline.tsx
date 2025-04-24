import { themeVars } from "@/theme/theme.css";
import { Muted, Small } from "@/ui/typography";
import { Timeline } from "antd";

export default function AnalysisOrderTimeline() {
	return (
		<Timeline
			items={[
				{
					color: themeVars.colors.palette.primary.default,
					children: (
						<div className="flex flex-col">
							<Small>1983, orders,$4220</Small>
							<Muted className="text-xs">08 Oct 2023 7:19 PM</Muted>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.info.default,
					children: (
						<div className="flex flex-col">
							<Small>Order #37745 from September</Small>
							<Muted className="text-xs">06 Oct 2023 5:19 PM</Muted>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.warning.default,
					children: (
						<div className="flex flex-col">
							<Small>New order placed #XF-2356</Small>
							<Muted className="text-xs">05 Oct 2023 4:19 PM</Muted>
						</div>
					),
				},
				{
					color: themeVars.colors.palette.error.default,
					children: (
						<div className="flex flex-col">
							<Small>New order placed #XF-2346</Small>
							<Muted className="text-xs">04 Oct 2023 3:19 PM</Muted>
						</div>
					),
				},
			]}
		/>
	);
}
