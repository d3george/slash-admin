import { Upload } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';

import { Iconify } from '../icon';

import { StyledUploadAvatar } from './styles';
import { beforeAvatarUpload, getBlobUrl } from './utils';

interface Props extends UploadProps {
  helperText?: React.ReactElement | string;
}
export function UploadAvatar({ helperText, ...other }: Props) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [isHover, setIsHover] = useState(false);
  const handelHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (['done', 'error'].includes(info.file.status!)) {
      // TODO: Get this url from response in real world.
      setImageUrl(getBlobUrl(info.file.originFileObj!));
    }
  };

  const renderPreview = <img src={imageUrl} alt="" className="absolute rounded-full" />;
  const renderPlaceholder = (
    <div className={`absolute z-10 ${imageUrl ? 'opacity-100' : 'opacity-70  hover:opacity-50'} `}>
      <Iconify icon="solar:camera-add-bold" size={32} />
      <div className="mt-1 text-xs">Upload Phote</div>
    </div>
  );
  const renderContent = (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
      onMouseEnter={() => handelHover(true)}
      onMouseLeave={() => handelHover(false)}
    >
      {imageUrl && renderPreview}
      {(!imageUrl || isHover) && renderPlaceholder}
    </div>
  );
  const renderHelpText = <div className="text-center">{helperText && helperText}</div>;

  return (
    <StyledUploadAvatar>
      <Upload
        name="avatar"
        showUploadList={false}
        listType="picture-circle"
        className="avatar-uploader !flex items-center justify-center opacity-70"
        {...other}
        beforeUpload={beforeAvatarUpload}
        onChange={handleChange}
      >
        {renderContent}
      </Upload>
      {renderHelpText}
    </StyledUploadAvatar>
  );
}
