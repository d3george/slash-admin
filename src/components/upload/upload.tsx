import { Upload as AntdUpload, Typography } from "antd";
import type { ItemRender } from "antd/es/upload/interface";
import { StyledUpload } from "./styles";
import UploadIllustration from "./upload-illustration";
import UploadListItem from "./upload-list-item";

import type { UploadProps } from "antd";

const { Dragger } = AntdUpload;
const { Text, Title } = Typography;

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
					<Typography>
						<Title level={5} className="mt-4">
							Drop or Select file
						</Title>
						<Text type="secondary">
							Drop files here or click
							<Text className="mx-2 !text-primary" underline>
								browse
							</Text>
							thorough your machine
						</Text>
					</Typography>
				</div>
			</Dragger>
		</StyledUpload>
	);
}
