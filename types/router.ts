import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  // antd menu selectedKeys
  key: string;
  // menu label
  label: string;
  // menu prefix icon
  icon?: ReactNode;
  // menu suffix icon
  suffix?: ReactNode;
  // show in tab
  hideTab?: boolean;
  // show in menu
  hideMenu?: boolean;
  // disable in menu
  disabled?: boolean;
  // need to auth,
  auth?: boolean;
  // react router outlet
  outlet?: any;
  // use to refresh tab
  timeStamp?: string;
}
export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;
