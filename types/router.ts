import type { ReactNode } from "react";
import type { Params, RouteObject } from "react-router";

export interface RouteMeta {
	/**
	 * antd menu selectedKeys
	 */
	key: string;
	/**
	 * menu label, i18n
	 */
	label: string;
	/**
	 * menu prefix icon
	 */
	icon?: ReactNode;
	/**
	 * menu suffix icon
	 */
	suffix?: ReactNode;
	/**
	 * hide in menu
	 */
	hideMenu?: boolean;
	/**
	 * hide in multi tab
	 */
	hideTab?: boolean;
	/**
	 * disable in menu
	 */
	disabled?: boolean;
	/**
	 * react router outlet
	 */
	outlet?: ReactNode;
	/**
	 * use to refresh tab
	 */
	timeStamp?: string;
	/**
	 * external link and iframe need
	 */
	frameSrc?: URL;
	/**
	 * dynamic route params
	 *
	 * @example /user/:id
	 */
	params?: Params<string>;
}
export type AppRouteObject = {
	order?: number;
	meta?: RouteMeta;
	children?: AppRouteObject[];
} & Omit<RouteObject, "children">;
