/* eslint-disable import/order */
import '@/utils/highlight';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import Toolbar, { formats } from './toolbar';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';
import { StyledEditor } from './styles';
import { useEffect, useState } from 'react';

interface Props extends ReactQuillProps {
  sample?: boolean;
}
export default function Editor({ id = 'slash-quill', sample = false, ...other }: Props) {
  const token = useThemeToken();
  const { themeMode } = useSettings();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(true);
  });
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <StyledEditor $token={token} $thememode={themeMode}>
      <Toolbar id={id} isSimple={sample} />
      {enabled ? (
        <ReactQuill
          modules={modules}
          formats={formats}
          {...other}
          placeholder="Write something awesome..."
        />
      ) : null}
    </StyledEditor>
  );
}
