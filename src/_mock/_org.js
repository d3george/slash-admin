import { rest } from 'msw';

import { ORG_LIST } from '@/_mock/assets';
import { OrgApi } from '@/api/services/orgService';

const orgList = rest.get(`/api${OrgApi.Org}`, (req, res, ctx) => {
  return res(
    ctx.json({
      status: 0,
      message: '',
      data: ORG_LIST,
    }),
  );
});

export default [orgList];
