import { Icon } from "@/components/icon";
import { Upload, UploadAvatar, UploadBox } from "@/components/upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Switch } from "@/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useState } from "react";

export default function UploadPage() {
	const [thumbnail, setThumbnail] = useState<boolean>(false);

	const onChange = (checked: boolean) => {
		setThumbnail(checked);
	};

	const ThumbnailSwitch = <Switch checked={thumbnail} onCheckedChange={onChange} />;

	const boxPlaceHolder = (
		<div className="flex flex-col">
			<Icon icon="eva:cloud-upload-fill" size={40} />
			<span className="text-sm text-gray-500">Upload File</span>
		</div>
	);
	const UploadFileTab = (
		<div className="flex flex-col gap-4">
			<Card title="Upload Multi File" className="w-full">
				<CardHeader>
					<CardTitle>
						<div className="flex items-center gap-2">
							<span>Upload Multi File</span>
							{ThumbnailSwitch}
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Upload thumbnail={thumbnail} name="multi" />
				</CardContent>
			</Card>
			<Card title="Upload Single File">
				<CardHeader>
					<CardTitle>
						<div className="flex items-center gap-2">
							<span>Upload Single File</span>
							{ThumbnailSwitch}
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Upload thumbnail={thumbnail} maxCount={1} name="single" />
				</CardContent>
			</Card>
		</div>
	);
	const UploadAvatarTab = (
		<Card title="Upload Avatar">
			<CardHeader>
				<CardTitle>
					<div className="flex items-center gap-2">
						<span>Upload Avatar</span>
						{ThumbnailSwitch}
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<UploadAvatar />
			</CardContent>
		</Card>
	);
	const UploadBoxTab = (
		<div className="flex flex-col gap-4">
			<div className="w-40 h-40">
				<UploadBox />
			</div>
			<div>
				<UploadBox placeholder={boxPlaceHolder} />
			</div>
		</div>
	);

	return (
		<Tabs defaultValue="upload--file" className="w-full">
			<TabsList>
				<TabsTrigger value="upload--file">Upload Single File</TabsTrigger>
				<TabsTrigger value="upload-avatar">Upload Avatar</TabsTrigger>
				<TabsTrigger value="upload-box">Upload Box</TabsTrigger>
			</TabsList>
			<TabsContent value="upload--file">{UploadFileTab}</TabsContent>
			<TabsContent value="upload-avatar">{UploadAvatarTab}</TabsContent>
			<TabsContent value="upload-box">{UploadBoxTab}</TabsContent>
		</Tabs>
	);
}
