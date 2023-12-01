import { PermissionType } from './enum';
import { RouteMeta } from './router';

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
  permissions?: Permission[];
}

export interface Organization {
  id: string;
  name: string;
  status: 'enable' | 'disable';
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface Permission {
  type: PermissionType;
  /**
   * router path
   * @description do not start with `/`
   */
  path: string;
  /**
   * compont path
   * @description do not start with `/`
   * @example
   *  if component is `components/icon`
   *  so componet real path will be `/src/pages/components/icon`
   */
  component: string;
  order?: number;
  meta: RouteMeta;
  children?: Permission[];
}
