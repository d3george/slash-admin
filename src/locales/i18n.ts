import { getStringItem } from "@/utils/storage";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LocalEnum, StorageEnum } from "#/enum";
import en_US from "./lang/en_US";
import zh_CN from "./lang/zh_CN";

const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.en_US as string);

// 初始化时设置HTML lang属性，否则系统语言和设定不同时会弹出浏览器的翻译提示
document.documentElement.lang = defaultLng;

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		lng: defaultLng, // localstorage -> i18nextLng: en_US
		fallbackLng: LocalEnum.en_US,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en_US: { translation: en_US },
			zh_CN: { translation: zh_CN },
		},
	});

export const { t } = i18n;
export default i18n;
