import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";

export default function IconPage() {
	return (
		<>
			<Card title="Iconify Icons">
				<CardHeader>
					<CardTitle>Iconify Icons</CardTitle>
					<CardDescription>
						<span className="mr-1">Simply beautiful open source icons. For more info</span>
						<Button variant="link" asChild>
							<a href="https://iconify.design/" target="_blank" rel="noreferrer">
								click here
							</a>
						</Button>
					</CardDescription>
				</CardHeader>

				<CardContent>
					<p className="mt-2">
						<code className="text-info">{` <Icon icon="solar:emoji-funny-square-bold-duotone" size={24} color={colorPrimary} /> `}</code>
					</p>

					<div className="mt-4 flex gap-4">
						<Icon
							icon="solar:emoji-funny-square-bold-duotone"
							size={24}
							color={themeVars.colors.palette.primary.default}
						/>
						<Icon
							icon="solar:emoji-funny-square-bold-duotone"
							size={24}
							color={themeVars.colors.palette.info.default}
						/>
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
						<Icon
							icon="solar:emoji-funny-square-bold-duotone"
							size={24}
							color={themeVars.colors.palette.error.default}
						/>
					</div>
				</CardContent>
			</Card>

			<Card title="Local Icons">
				<CardHeader>
					<CardTitle>Local Icons</CardTitle>
					<CardDescription>
						<span className="mr-1">For more info</span>
						<Button variant="link" asChild>
							<a
								href="https://iconify.design/docs/icon-components/react/add-icon.html"
								target="_blank"
								rel="noreferrer"
							>
								click here
							</a>
						</Button>
					</CardDescription>
				</CardHeader>

				<CardContent>
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
				</CardContent>
			</Card>
		</>
	);
}
