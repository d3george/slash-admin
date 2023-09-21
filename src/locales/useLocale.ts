import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';
import { useTranslation } from 'react-i18next';

import { LocalEnum } from '#/enum';
import type { Locale as AntdLocal } from 'antd/es/locale';

type Locale = keyof typeof LocalEnum;
type Language = {
  locale: keyof typeof LocalEnum;
  icon: string;
  label: string;
  antdLocal: AntdLocal;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
  [LocalEnum.zh_CN]: {
    locale: LocalEnum.zh_CN,
    label: 'Chinese',
    icon: 'ic-locale_zh_CN',
    antdLocal: zh_CN,
  },
  [LocalEnum.en_US]: {
    locale: LocalEnum.en_US,
    label: 'English',
    icon: 'ic-locale_en_US',
    antdLocal: en_US,
  },
};

export default function useLocale() {
  const { i18n } = useTranslation();

  /**
   * localstorage -> i18nextLng change
   */
  const setLocale = (locale: Locale) => {
    i18n.changeLanguage(locale);
  };

  const locale = (i18n.resolvedLanguage || LocalEnum.en_US) as Locale;

  const language = LANGUAGE_MAP[locale];

  return {
    locale,
    language,
    setLocale,
  };
}
