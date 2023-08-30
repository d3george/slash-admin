import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, theme } from 'antd';
import { CSSProperties, useState } from 'react';
import { MdCircle } from 'react-icons/md';

import CyanBlur from '@/assets/images/cyan-blur.png';
import RedBlur from '@/assets/images/red-blur.png';
import { SvgIcon } from '@/components/icon';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { colorPrimarys } from '@/theme/antd/theme';

import { ThemeColorPresets, ThemeMode } from '#/enum';

const { useToken } = theme;
/**
 * App Setting
 */
function Settings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    token: { colorPrimary, colorTextSecondary },
  } = useToken();

  const settings = useSettings();
  const { themeMode, themeColorPresets } = settings;
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
          <Button type="dashed" block size="large">
            <span className="text-gray-400">FullScreen</span>
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
