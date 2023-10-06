import { GlobalToken, Input, InputRef, Modal } from 'antd';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBoolean, useEvent } from 'react-use';
import { styled } from 'styled-components';

import { IconButton, SvgIcon } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';
import { useRouter } from '@/router/hooks';
import { flattenMenuRoutes, getMenuRoutes } from '@/router/utils';
import { useThemeToken } from '@/theme/hooks';

export default function SearchBar() {
  const { t } = useTranslation();
  const { replace } = useRouter();
  const inputRef = useRef<InputRef>(null);
  const [search, toggle] = useBoolean(false);
  const themeToken = useThemeToken();

  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const flattenedRoutes = useMemo(() => {
    const menuRoutes = getMenuRoutes();
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(flattenedRoutes);

  useEffect(() => {
    const result = flattenedRoutes.filter(
      (item) =>
        t(item.title).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        item.key.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
    );
    setSearchResult(result);
  }, [searchQuery, t, flattenedRoutes]);

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
          {searchResult.map(({ key, title }) => {
            const partsTitle = parse(t(title), match(t(title), searchQuery));
            const partsKey = parse(key, match(key, searchQuery));
            return (
              <StyledListItemButton key={key} themetoken={themeToken}>
                <button
                  onClick={() => {
                    replace(key);
                    handleCancel();
                  }}
                >
                  <div className="font-medium">
                    {partsTitle.map((item) => (
                      <span
                        style={{
                          color: item.highlight ? themeToken.colorPrimary : themeToken.colorText,
                        }}
                      >
                        {item.text}
                      </span>
                    ))}
                  </div>
                  <div>
                    {partsKey.map((item) => (
                      <span
                        style={{
                          color: item.highlight
                            ? themeToken.colorPrimary
                            : themeToken.colorTextDescription,
                        }}
                      >
                        {item.text}
                      </span>
                    ))}
                  </div>
                </button>
              </StyledListItemButton>
            );
          })}
        </Scrollbar>
      </Modal>
    </>
  );
}

const StyledListItemButton = styled.div<{ themetoken: GlobalToken }>`
  button {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px 16px;
    border-radius: 8px;
    border-bottom: ${(props) => `1px dashed ${props.themetoken.colorSplit}`};

    &:hover {
      border: ${(props) => `1px dashed ${props.themetoken.colorPrimary}`};
      background-color: ${(props) => `${props.themetoken.colorPrimaryBg}`};
    }
  }
`;
