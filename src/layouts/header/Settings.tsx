import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Drawer } from 'antd';
import { CSSProperties, useState } from 'react';
import { MdCircle } from 'react-icons/md';
import screenfull from 'screenfull';

import CyanBlur from '@/assets/images/cyan-blur.png';
import RedBlur from '@/assets/images/red-blur.png';
import { SvgIcon } from '@/components/icon';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { colorPrimarys } from '@/theme/antd/theme';
import { useThemeToken } from '@/theme/hooks';

import { ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';

/**
 * App Setting
 */
function Settings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { colorPrimary, colorBgBase, colorTextSecondary } = useThemeToken();

  const settings = useSettings();
  const { themeMode, themeColorPresets, themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const setThemeMode = (themeMode: ThemeMode) => {
    setSettings({
      ...settings,
      themeMode,
    });
  };

  const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets,
    });
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
    transform: 'none',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  };
  const bodyStyle: CSSProperties = {
    padding: 0,
  };

  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };

  const layoutBackground = (layout: ThemeLayout) =>
    themeLayout === layout
      ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)`
      : '#919eab';

  return (
    <>
      <div className="animate-spin-slow">
        <button
          onClick={() => setDrawerOpen(true)}
          className=" flex h-10 w-10 transform-none cursor-pointer items-center justify-center rounded-full hover:scale-105 hover:bg-hover"
        >
          <SvgIcon icon="ic-setting" size="24" />
        </button>
      </div>
      <Drawer
        placement="right"
        title="Settings"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={280}
        bodyStyle={bodyStyle}
        maskStyle={{ backgroundColor: 'transparent' }}
        style={style}
        extra={
          <button
            onClick={() => setDrawerOpen(false)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:scale-105 hover:bg-hover"
          >
            <CloseOutlined className="text-gray-400" />
          </button>
        }
        footer={
          <Button type="dashed" block size="large" onClick={toggleFullScreen}>
            <div className="flex items-center justify-center">
              {isFullscreen ? (
                <>
                  <SvgIcon
                    icon="ic-settings-exit-fullscreen"
                    color={colorPrimary}
                    className="!m-0"
                  />
                  <span className="ml-2">Exit FullScreen</span>
                </>
              ) : (
                <>
                  <SvgIcon icon="ic-settings-fullscreen" className="!m-0" />
                  <span className="ml-2 text-gray">FullScreen</span>
                </>
              )}
            </div>
          </Button>
        }
      >
        <div className="flex flex-col gap-6 p-6">
          <div>
            <div className="mb-3 text-xs font-semibold" style={{ color: colorTextSecondary }}>
              Mode
            </div>
            <div className="flex flex-row gap-4">
              <Card
                onClick={() => setThemeMode(ThemeMode.Light)}
                className="flex h-20 w-full cursor-pointer items-center justify-center"
              >
                <SvgIcon
                  icon="ic-settings-mode-sun"
                  size="24"
                  color={themeMode === ThemeMode.Light ? colorPrimary : ''}
                />
              </Card>
              <Card
                onClick={() => setThemeMode(ThemeMode.Dark)}
                className="flex h-20 w-full cursor-pointer items-center justify-center"
              >
                <SvgIcon
                  icon="ic-settings-mode-moon"
                  size="24"
                  color={themeMode === ThemeMode.Dark ? colorPrimary : ''}
                />
              </Card>
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold" style={{ color: colorTextSecondary }}>
              Layout
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Vertical)}
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div className="flex h-full w-7 flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Horizontal)}
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div className="flex h-4 w-full items-center gap-1  p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                  <div
                    className="h-1 w-4 flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                  <div
                    className="h-1 w-3 flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Mini)}
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                bodyStyle={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <div className="flex h-full flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold" style={{ color: colorTextSecondary }}>
              Presets
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => (
                <Card
                  key={preset}
                  className="flex h-14 w-full cursor-pointer items-center justify-center"
                  style={{ backgroundColor: themeColorPresets === preset ? `${color}14` : '' }}
                  onClick={() => setThemeColorPresets(preset as ThemeColorPresets)}
                >
                  <div style={{ color }}>
                    <MdCircle style={{ fontSize: themeColorPresets === preset ? 24 : 12 }} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
export default Settings;
