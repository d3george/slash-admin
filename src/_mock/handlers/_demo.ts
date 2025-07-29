import { DemoApi } from "@/api/services/demoService";
import { ResultStatus } from "@/types/enum";
import { http, HttpResponse } from "msw";

const mockTokenExpired = http.post(`/api${DemoApi.TOKEN_EXPIRED}`, () => {
	return new HttpResponse(null, { status: ResultStatus.TIMEOUT });
});

export { mockTokenExpired };
