import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
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
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { setUserToken, setUserInfo } = useUserActions();

  // const signInMutation = useMutation(userService.signin);

  const signIn = async (data: SignInReq) => {
    // const res = await signInMutation.mutateAsync(data);
    console.log(data);
    const res = {
      user: {
        id: '996061ef-c4db-474e-a379-001efb36aeba',
        email: '317010370@qq.com',
        username: 'dsying',
        createdAt: '2023-08-28T00:21:42.270Z',
        updatedAt: '2023-08-28T03:49:46.000Z',
      },
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    const { user, accessToken, refreshToken } = res;
    setUserToken({ accessToken, refreshToken });
    setUserInfo(user);
    navigatge('/dashboard', { replace: true });
  };
  return signIn;
};
