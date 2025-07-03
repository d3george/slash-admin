import ApexChart from "react-apexcharts";
import { chartWrapper } from "./styles.css";

import type { Props as ApexChartProps } from "react-apexcharts";

export function Chart(props: ApexChartProps) {
	return (
		<div className={chartWrapper}>
			<ApexChart
				{...props}
				options={{
					...props.options,
					chart: {
						...props.options?.chart,
						// 优化响应式性能
						animations: {
							...props.options?.chart?.animations,
							enabled: true,
							speed: 200, // 减少动画时间
							animateGradually: {
								enabled: false, // 禁用渐进动画
							},
							dynamicAnimation: {
								enabled: true,
								speed: 200, // 减少动态动画时间
							},
						},
						// 启用硬件加速
						redrawOnParentResize: true,
						redrawOnWindowResize: true,
					},
				}}
			/>
		</div>
	);
}
