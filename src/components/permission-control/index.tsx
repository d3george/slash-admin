import { useUserPermission } from "@/store/userStore";
import { flattenTrees } from "@/utils/tree";
import { memo, useMemo } from "react";
import type { ReactNode } from "react";

import { PermissionType } from "#/enum";

type Props = {
	children?: ReactNode;
	fallback?: ReactNode;
	perm: string | string[];
};

function PermissionControl(props: Props) {
	const { children = null, fallback = null, perm } = props;
	const permissions = useUserPermission();
	const buttons = useMemo(
		() => flattenTrees(permissions || []).filter((permission) => permission.type === PermissionType.BUTTON),
		[permissions],
	);
	const perms = useMemo(() => (Array.isArray(perm) ? perm : [perm]), [perm]);
	const hasPermission = useMemo(() => {
		return perms.some((perm) => buttons.some((button) => button.perm === perm));
	}, [buttons, perms]);

	return hasPermission ? children : fallback;
}

export default memo(PermissionControl);
