import { Upload as AntdUpload } from "antd";
import type { ItemRender } from "antd/es/upload/interface";
import { StyledUpload } from "./styles";
import UploadIllustration from "./upload-illustration";
import UploadListItem from "./upload-list-item";

import type { UploadProps } from "antd";

const { Dragger } = AntdUpload;

interface Props extends UploadProps {
	thumbnail?: boolean;
}

const itemRender: (thumbnail: boolean) => ItemRender = (thumbnail) => {
	return function temp(...args) {
		const [, file, , actions] = args;
		return <UploadListItem file={file} actions={actions} thumbnail={thumbnail} />;
	};
};
export function Upload({ thumbnail = false, ...other }: Props) {
	return (
		<StyledUpload $thumbnail={thumbnail}>
			<Dragger {...other} itemRender={itemRender(thumbnail)}>
				<div className="opacity-100 hover:opacity-80">
					<p className="m-auto max-w-[200px]">
						<UploadIllustration />
					</p>
					<div>
						<h5 className="mt-4">Drop or Select file</h5>
						<p className="text-sm text-gray-500">
							Drop files here or click
							<span className="mx-2 text-primary underline">browse</span>
							thorough your machine
						</p>
					</div>
				</div>
			</Dragger>
		</StyledUpload>
	);
}
