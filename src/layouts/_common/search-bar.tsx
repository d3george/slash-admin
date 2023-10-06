import { GlobalToken, Input, InputRef, Modal, Typography } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBoolean, useEvent } from 'react-use';
import { styled } from 'styled-components';

import { IconButton, SvgIcon } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';
import { useRouter } from '@/router/hooks';
import { flattenMenuRoutes, getMenuRoutes } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

import { RouteMeta } from '#/router';

export default function SearchBar() {
  const { t } = useTranslation();
  const { replace } = useRouter();
  const inputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, toggle] = useBoolean(false);
  const themeToken = useThemeToken();

  const [flattenedRoutes, setFlattenedRoutes] = useState<RouteMeta[]>([]);

  const flattenRoutes = useCallback(flattenMenuRoutes, []);

  useEffect(() => {
    const menuRoutes = getMenuRoutes();
    const result = flattenRoutes(menuRoutes);
    console.log('result', result);

    setFlattenedRoutes(result);
  }, [flattenRoutes]);

  const handleMetaK = (event: KeyboardEvent) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey
    if (!search && event.metaKey && event.key === 'k') {
      handleOpen();
    }
  };
  useEvent('keydown', handleMetaK);

  const handleOpen = () => {
    toggle(true);
    setSearchQuery('');
  };
  const handleCancel = () => {
    toggle(false);
    setSearchQuery('');
  };
  const handleAfterOpenChange = (open: boolean) => {
    if (open) {
      // auto focus
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-10 w-10" onClick={handleOpen}>
          <SvgIcon icon="ic-search" size="20" />
        </IconButton>
        <IconButton className="0 h-6 rounded-md bg-hover text-xs font-bold">⌘K</IconButton>
      </div>
      <Modal
        open={search}
        centered
        onCancel={handleCancel}
        footer={null}
        closeIcon={false}
        afterOpenChange={handleAfterOpenChange}
        bodyStyle={{ height: '400px' }}
        title={
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            bordered={false}
            autoFocus
            prefix={<SvgIcon icon="ic-search" size="20" />}
            suffix={
              <IconButton className="h-6 rounded-md bg-hover text-xs" onClick={handleCancel}>
                Esc
              </IconButton>
            }
          />
        }
      >
        <Scrollbar>
          {flattenedRoutes.map(({ key, title }) => (
            <StyledListItemButton key={key} themeToken={themeToken}>
              <button onClick={() => replace(key)}>
                <div className="font-medium">{t(title)}</div>
                <Typography.Text type="secondary">{key}</Typography.Text>
              </button>
            </StyledListItemButton>
          ))}
        </Scrollbar>
      </Modal>
    </>
  );
}

const StyledListItemButton = styled.div<{ themeToken: GlobalToken }>`
  button {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    border-bottom: ${(props) => `1px dashed ${props.themeToken.colorSplit}`};

    &:hover {
      border: ${(props) => `1px dashed ${props.themeToken.colorPrimary}`};
      background-color: ${(props) => `${props.themeToken.colorPrimaryBg}`};
    }
  }
`;
