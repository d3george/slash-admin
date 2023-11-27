import apiClient from '../apiClient';

import { Organization } from '#/entity';

export enum OrgApi {
  Org = '/org',
}

const getOrgList = () => apiClient.get<Organization[]>({ url: OrgApi.Org });

export default {
  getOrgList,
};
