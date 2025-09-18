import { faker } from "@faker-js/faker";
import type { EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";

export const INITIAL_EVENTS: EventInput[] = [
	{
		id: faker.string.uuid(),
		title: "动脉瘤病例讨论会",
		start: dayjs().toISOString(),
		end: dayjs().add(2, "hour").toISOString(),
		color: "#7a0916",
	},
	{
		id: faker.string.uuid(),
		title: "肝癌专题影像会",
		start: dayjs().add(1, "day").toISOString(),
		end: dayjs().add(1, "day").toISOString(),
		allDay: faker.datatype.boolean(),
		color: "#00b8d9",
	},
	{
		id: faker.string.uuid(),
		title: "脑影像晨读会",
		start: dayjs().add(3, "day").toISOString(),
		end: dayjs().add(3, "day").toISOString(),
		allDay: faker.datatype.boolean(),
		color: "#ff5630",
	},
	{
		id: faker.string.uuid(),
		title: "神经系统病小讲课",
		start: dayjs().add(7, "day").toISOString(),
		end: dayjs().add(7, "day").toISOString(),
		allDay: faker.datatype.boolean(),
		color: "#ffab00",
	},
	{
		id: faker.string.uuid(),
		title: "消化系统读片会",
		start: dayjs().add(8, "day").toISOString(),
		end: dayjs().add(8, "day").toISOString(),
		allDay: faker.datatype.boolean(),
		color: "#1c47b5ff",
	},
	{
		id: faker.string.uuid(),
		title: "儿科影像病例分享",
		start: dayjs().add(9, "day").toISOString(),
		end: dayjs().add(9, "day").toISOString(),
		allDay: faker.datatype.boolean(),
		color: "#8e33ff",
	},
	{
		id: faker.string.uuid(),
		title: "肺病小讲课",
		start: dayjs().add(11, "day").toISOString(),
		end: dayjs().add(11, "day").toISOString(),
		color: "#00a76f",
	},
];
