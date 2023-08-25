import { Drawer } from 'antd';
import { useState } from 'react';

import { AppLocalePicker } from '@/components/app';
import { SvgIcon } from '@/components/icon';

import Sidebar from '../sidebar';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 w-full">
        <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 text-gray md:px-6 2xl:px-11">
          <div className="flex items-center">
            {/* hidden when screen widht > lg, when click show Sidebar Drawer */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-hover lg:hidden"
            >
              <SvgIcon icon="ic-menu" size="24" />
            </button>

            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-hover">
              <SvgIcon icon="ic-search" size="20" />
            </button>
            <span className="flex h-6 cursor-pointer items-center justify-center rounded-md bg-hover px-2 py-0 text-xs font-bold">
              ⌘K
            </span>
          </div>

          <div className="flex">
            <AppLocalePicker />
            <div className="animate-spin-slow">
              <button className=" flex h-10 w-10 transform-none cursor-pointer items-center justify-center rounded-full hover:scale-105 hover:bg-hover">
                <SvgIcon icon="ic-setting" size="24" />
              </button>
            </div>
            <button className=" flex h-10 w-10 transform-none cursor-pointer items-center justify-center rounded-full hover:scale-105 hover:bg-hover">
              <img
                className="h-8 w-8 rounded-full"
                src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
                alt=""
              />
            </button>
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        width="auto"
      >
        <Sidebar closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
export default Header;
