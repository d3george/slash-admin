import { convertFlatToTree } from "@/utils/tree";
import { http, HttpResponse, delay } from "msw";
import { DB_MENU } from "../assets_backup";

const menuList = http.get("/api/menu", async () => {
	const menuTree = convertFlatToTree(DB_MENU);
	return HttpResponse.json(
		{
			message: "",
			data: menuTree,
			status: 0,
		},
		{
			status: 200, // 200 表示成功
		},
	);
});

export default [menuList];
