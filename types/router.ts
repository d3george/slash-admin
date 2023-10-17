import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  // antd menu selectedKeys
  key: string;
  title: string;
  icon?: ReactNode;
  // show in tab
  hideTab?: boolean;
  // show in menu
  hideMenu?: boolean;
  // need to auth,
  auth?: boolean;
}
export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;
