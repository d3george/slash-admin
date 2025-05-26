import type { BasicStatus, PermissionType } from "./enum";

export interface UserToken {
	accessToken?: string;
	refreshToken?: string;
}

export interface UserInfo {
	id: string;
	email: string;
	username: string;
	password?: string;
	avatar?: string;
	role?: Role;
	status?: BasicStatus;
	permissions?: Permission[];
}

export interface Permission {
	id: string;
	parentId: string;
	name: string;
	label: string;
	type: PermissionType;
	route: string;
	status?: BasicStatus;
	order?: number;
	icon?: string;
	component?: string;
	hide?: boolean;
	hideTab?: boolean;
	frameSrc?: URL;
	newFeature?: boolean;
	children?: Permission[];
}

export interface Role {
	id: string;
	name: string;
	label: string;
	status: BasicStatus;
	order?: number;
	desc?: string;
	permission?: Permission[];
}

export interface CommonOptions {
	status?: BasicStatus;
	desc?: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface User_V1 extends CommonOptions {
	id: string; // uuid
	username: string;
	password: string;
	email: string;
	phone?: string;
	avatar?: string;
}

export interface Role_V1 extends CommonOptions {
	id: string; // uuid
	name: string;
	code: string;
}

export interface Permission_V1 extends CommonOptions {
	id: string; // uuid
	name: string;
	resource: string; // example: "user-management"
	action: string; // example: "read" | "delete" | "update" | "create"
}

export interface Menu extends CommonOptions, MenuMetaInfo {
	id: string; // uuid
	parentId: string;
	name: string;
	code: string;
	order?: number;
	type: PermissionType;
}

export type MenuMetaInfo = {
	path?: string; // nav path
	icon?: string; // nav icon
	caption?: string; // nav caption
	info?: string; // nav info
	disabled?: boolean; // nav disabled
	externalLink?: URL;
	frameSrc?: URL;

	requiredPermissions?: {
		resource: string;
		action: string;
	};

	// type: MENU
	component?: string;
};
