import { convertToTree } from "@/utils/tree";
import { http, HttpResponse, delay } from "msw";
import { DB_MENU } from "../assets_backup";

const menuList = http.get("/api/menu", async () => {
	await delay(1000);
	// 这里要把DB_MENU转换成树形结构
	const treeMenu = convertToTree(DB_MENU);
	console.log("treeMenu", treeMenu);
	return HttpResponse.json(treeMenu, {
		status: 200,
	});
});

export default [menuList];
