import PermissionControl from "@/components/permission-control";
import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
export default function ButtonPage() {
	const { t } = useTranslation();
	return (
		<Card>
			<div className={"flex gap-2 items-center"}>
				<span>Your current Button Permissions: </span>
				<PermissionControl perm={"functions:button:edit"}>
					<Button type="primary">{t("common.saveText")}</Button>
				</PermissionControl>
				<PermissionControl perm={"functions:button:delete"}>
					<Button type="primary">{t("common.delText")}</Button>
				</PermissionControl>
			</div>
		</Card>
	);
}
