import { useMutation } from '@tanstack/react-query';
import { Divider, MenuProps, theme } from 'antd';
import Dropdown, { DropdownProps } from 'antd/es/dropdown/dropdown';
import React from 'react';
import { NavLink } from 'react-router-dom';

import userService from '@/api/services/userService';
import { useLoginStateContext } from '@/pages/sys/login/providers/LoginStateProvider';
import { useUserInfo, useUserActions } from '@/store/userStore';

const { useToken } = theme;

function UserSetting() {
  const { token } = useToken();
  const { username, email } = useUserInfo();
  const { clearUserInfoAndToken } = useUserActions();
  const logoutMutation = useMutation(userService.logout);
  const { backToLogin } = useLoginStateContext();

  const logout = () => {
    try {
      logoutMutation.mutateAsync();
    } catch (error) {
      console.log(error);
    }
    clearUserInfoAndToken();
    backToLogin();
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const dropdownRender: DropdownProps['dropdownRender'] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{username}</div>
        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps['items'] = [
    { label: <NavLink to="/dashboard">Home</NavLink>, key: '0' },
    { label: <NavLink to="/dashboard">Profile</NavLink>, key: '1' },
    { label: <NavLink to="/dashboard">Settings</NavLink>, key: '2' },
    { type: 'divider' },
    {
      label: (
        <button onClick={logout} className="font-bold text-orange">
          Logout
        </button>
      ),
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <button className=" flex h-10 w-10 transform-none cursor-pointer items-center justify-center rounded-full hover:scale-105 hover:bg-hover">
        <img
          className="h-8 w-8 rounded-full"
          src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
          alt=""
        />
      </button>
    </Dropdown>
  );
}

export default UserSetting;
