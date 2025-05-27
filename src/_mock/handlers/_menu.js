import { convertFlatToTree } from "@/utils/tree";
import { http, HttpResponse, delay } from "msw";
import { DB_MENU } from "../assets_backup";

const menuList = http.get("/api/menu", async () => {
	await delay(1000);
	const menuTree = convertFlatToTree(DB_MENU);
	console.log("menuTree", menuTree);
	return HttpResponse.json(menuTree, {
		status: 200,
	});
});

export default [menuList];
