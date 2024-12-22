import { StepBackwardOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";

import { Iconify, SvgIcon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";

export default function IconPage() {
	return (
		<Space direction="vertical" style={{ display: "flex" }}>
			<Card title="Antd Icons">
				<span className="mr-1">For more info</span>
				<Typography.Link
					href="https://ant.design/components/icon-cn"
					style={{ color: themeVars.colors.palette.primary.default }}
				>
					click here
				</Typography.Link>

				<p className="mt-2 flex flex-col text-info">
					<code>{`import { StepBackwardOutlined } from '@ant-design/icons';`}</code>
					<code>{"<StepBackwardOutlined /> "}</code>
				</p>

				<div className="mt-4">
					<StepBackwardOutlined width={24} />
				</div>
			</Card>
			<Card title="Iconify Icons">
				<span className="mr-1">Simply beautiful open source icons. For more info</span>
				<Typography.Link href="https://iconify.design/" style={{ color: themeVars.colors.palette.primary.default }}>
					click here
				</Typography.Link>

				<p className="mt-2">
					<code className="text-info">{` <Iconify icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorPrimary} /> `}</code>
				</p>

				<div className="mt-4 flex gap-4">
					<Iconify
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.primary.default}
					/>
					<Iconify
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.info.default}
					/>
					<Iconify
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.success.default}
					/>
					<Iconify
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.warning.default}
					/>
					<Iconify
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.error.default}
					/>
				</div>
			</Card>
			<Card title="Svg Icons">
				<span className="mr-1">For more info</span>
				<Typography.Link
					href="https://github.com/vbenjs/vite-plugin-svg-icons"
					style={{ color: themeVars.colors.palette.primary.default }}
				>
					click here
				</Typography.Link>

				<p className="mt-2">
					<code className="text-info">{`<SvgIcon icon="ic-workbench" size={24} color={colorPrimary} />`}</code>
				</p>

				<div className="mt-4 flex gap-4">
					<SvgIcon icon="ic-workbench" size={24} color={themeVars.colors.palette.primary.default} />
					<SvgIcon icon="ic-workbench" size={24} color={themeVars.colors.palette.info.default} />
					<SvgIcon icon="ic-workbench" size={24} color={themeVars.colors.palette.success.default} />
					<SvgIcon icon="ic-workbench" size={24} color={themeVars.colors.palette.warning.default} />
					<SvgIcon icon="ic-workbench" size={24} color={themeVars.colors.palette.error.default} />
				</div>
			</Card>
		</Space>
	);
}
