import { varFade } from "@/components/animate/variants";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { fBytes } from "@/utils/format-number";
import type { ItemRender } from "antd/es/upload/interface";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { getBlobUrl, getFileFormat, getFileThumb } from "./utils";

type Props = {
	file: Parameters<ItemRender>["1"];
	actions: Parameters<ItemRender>["3"];
	thumbnail?: boolean;
};

export default function UploadListItem({ file, actions, thumbnail = false }: Props) {
	const { name, size } = file;
	const thumb = getFileThumb(name);
	const format = getFileFormat(name);
	const [imgThumbUrl, setImgThumbUrl] = useState("");

	useEffect(() => {
		// TODO: mock upload sucess, you should delete 'error' in the production environment
		if (file.status && ["done", "error"].includes(file.status) && format === "img") {
			if (file.originFileObj) {
				setImgThumbUrl(getBlobUrl(file.originFileObj));
			}
		}
	}, [file, format]);

	const closeButton = (
		<Button variant="ghost" size="icon" className="ml-auto rounded-full" onClick={actions.remove}>
			<Icon icon="mingcute:close-line" size={16} />
		</Button>
	);

	const thumbItem = (
		<Card
			className="relative flex items-center justify-center"
			style={{ width: 80, height: 80, marginTop: "8px", marginRight: "8px" }}
		>
			<Tooltip>
				<TooltipTrigger>
					{format === "img" ? (
						<img src={imgThumbUrl} alt={name} className="w-8 h-8" />
					) : (
						<Icon icon={`local:${thumb}`} size={40} />
					)}
				</TooltipTrigger>
				<TooltipContent>{name}</TooltipContent>
			</Tooltip>
			<div className="absolute right-0 top-0">{closeButton}</div>
		</Card>
	);
	const cardItem = (
		<Card className="p-2 mt-2">
			<div className="flex items-center gap-2">
				{format === "img" ? (
					<img src={imgThumbUrl} alt={name} className="w-8 h-8" />
				) : (
					<Icon icon={`local:${thumb}`} size={32} />
				)}
				<div className="ml-4 flex flex-col">
					<p className="text-sm font-medium">{name}</p>
					<p className="text-xs">{fBytes(size)}</p>
				</div>
				{closeButton}
			</div>
		</Card>
	);
	return (
		<m.div initial="initial" animate="animate" exit="exit" variants={varFade().inUp}>
			{thumbnail ? thumbItem : cardItem}
		</m.div>
	);
}
