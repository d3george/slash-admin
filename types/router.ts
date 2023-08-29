import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  title?: string;
  icon?: string;
  // show in tab
  hideTab?: boolean;
  // show in menu
  hideMenu?: boolean;
  // need to auth,
  auth?: boolean;
}
export type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
  meta?: RouteMeta;
};
