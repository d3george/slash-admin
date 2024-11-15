import { http, HttpResponse } from "msw";

import { ORG_LIST } from "@/_mock/assets";
import { OrgApi } from "@/api/services/orgService";

const orgList = http.get(`/api${OrgApi.Org}`, () => {
	return HttpResponse.json({
		status: 0,
		message: "",
		data: ORG_LIST,
	});
});

export default [orgList];
