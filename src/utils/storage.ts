import { StorageEnum } from '#/enum';

export const getItem = <T>(key: StorageEnum): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
export const setItem = <T>(key: StorageEnum, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeItem = (key: StorageEnum): void => {
  localStorage.removeItem(key);
};
export const clearItems = () => {
  localStorage.clear();
};
