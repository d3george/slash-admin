import { StepBackwardOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";

import { Icon } from "@/components/icon";
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
					<code className="text-info">{` <Icon icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorPrimary} /> `}</code>
				</p>

				<div className="mt-4 flex gap-4">
					<Icon
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.primary.default}
					/>
					<Icon icon="solar:emoji-funny-square-bold-duotone" size={24} color={themeVars.colors.palette.info.default} />
					<Icon
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.success.default}
					/>
					<Icon
						icon="solar:emoji-funny-square-bold-duotone"
						size={24}
						color={themeVars.colors.palette.warning.default}
					/>
					<Icon icon="solar:emoji-funny-square-bold-duotone" size={24} color={themeVars.colors.palette.error.default} />
				</div>
			</Card>
			<Card title="Local Icons">
				<span className="mr-1">For more info</span>
				<Typography.Link
					href="https://iconify.design/docs/icon-components/react/add-icon.html"
					style={{ color: themeVars.colors.palette.primary.default }}
				>
					click here
				</Typography.Link>

				<p className="mt-2">
					<code className="text-info">{`<Icon icon="local:ic-workbench" size={24} color={colorPrimary} />`}</code>
				</p>

				<div className="mt-4 flex gap-4">
					<Icon icon="local:ic-workbench" size={24} color={themeVars.colors.palette.primary.default} />
					<Icon icon="local:ic-workbench" size={24} color={themeVars.colors.palette.info.default} />
					<Icon icon="local:ic-workbench" size={24} color={themeVars.colors.palette.success.default} />
					<Icon icon="local:ic-workbench" size={24} color={themeVars.colors.palette.warning.default} />
					<Icon icon="local:ic-workbench" size={24} color={themeVars.colors.palette.error.default} />
				</div>
			</Card>
		</Space>
	);
}
