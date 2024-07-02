import apiClient from '../apiClient';

export enum DemoApi {
  TOKEN_EXPIRED = '/user/tokenExpired',
}

const mockTokenExpired = () => apiClient.post({ url: DemoApi.TOKEN_EXPIRED });

export default {
  mockTokenExpired,
};
