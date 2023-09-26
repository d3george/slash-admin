import { UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { ReactElement } from 'react';

import { Iconify } from '../icon';

import { StyledUpload } from './styles';

interface Props extends UploadProps {
  placeholder?: ReactElement;
}
export function UploadBox({ placeholder, ...other }: Props) {
  return (
    <StyledUpload>
      <Dragger {...other} showUploadList={false}>
        <div className="opacity-60 hover:opacity-50">
          {placeholder || <Iconify icon="eva:cloud-upload-fill" size={28} />}
        </div>
      </Dragger>
    </StyledUpload>
  );
}
