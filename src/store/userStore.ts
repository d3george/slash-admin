import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq } from '@/api/services/userService';
import { getItem, setItem } from '@/utils/storage';

import { UserToken, UserInfo } from '#/entity';
import { StorageEnum } from '#/enum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const { setUserToken, setUserInfo } = useUserActions();
  const signInMutation = useMutation(userService.signin);
  const navigatge = useNavigate();

  const signIn = async (data: SignInReq) => {
    const res = await signInMutation.mutateAsync(data);
    const { user, accessToken, refreshToken } = res;
    setUserToken({ accessToken, refreshToken });
    setUserInfo(user);

    navigatge('/dashboard', { replace: true });
    return res;
  };
  return signIn;
};
