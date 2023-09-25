import { Typography, Upload as AntdUpload } from 'antd';
import { ItemRender } from 'antd/es/upload/interface';

import { useThemeToken } from '@/theme/hooks';

import { StyledUpload } from './styles';
import UploadIllustration from './upload-illustration';
import UploadListItem from './upload-list-item';

import type { UploadProps } from 'antd';

const { Dragger } = AntdUpload;
const { Text, Title } = Typography;

interface Props extends UploadProps {
  thumbnail?: boolean;
}

const itemRender: (thumbnail: boolean) => ItemRender = (thumbnail) => {
  return function temp() {
    // eslint-disable-next-line prefer-rest-params
    const [, file, , actions] = arguments;
    return <UploadListItem file={file} actions={actions} thumbnail={thumbnail} />;
  };
};
export function Upload({ thumbnail = false, ...other }: Props) {
  const { colorPrimary } = useThemeToken();
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
              <Text style={{ color: colorPrimary }} className="mx-2" underline>
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
