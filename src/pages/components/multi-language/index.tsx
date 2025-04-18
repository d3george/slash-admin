import { Icon } from "@/components/icon";
import useLocale from "@/locales/use-locale";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { LocalEnum } from "#/enum";

export default function MultiLanguagePage() {
	const {
		setLocale,
		locale,
		language: { icon, label },
	} = useLocale();

	return (
		<>
			<Button variant="link" asChild>
				<a href="https://www.i18next.com/" style={{ color: themeVars.colors.palette.primary.default }}>
					https://www.i18next.com
				</a>
			</Button>
			<Button variant="link" asChild>
				<a href="https://ant.design/docs/react/i18n-cn" style={{ color: themeVars.colors.palette.primary.default }}>
					https://ant.design/docs/react/i18n-cn
				</a>
			</Button>
			<Card>
				<CardHeader>
					<CardTitle>Flexible</CardTitle>
				</CardHeader>
				<CardContent>
					<RadioGroup onValueChange={(value: LocalEnum) => setLocale(value)} defaultValue={locale}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value={LocalEnum.en_US} id="en_US" />
							<label htmlFor="en_US">English</label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value={LocalEnum.zh_CN} id="zh_CN" />
							<label htmlFor="zh_CN">Chinese</label>
						</div>
					</RadioGroup>

					<div className="flex items-center text-4xl">
						<Icon icon={`local:${icon}`} className="mr-4 rounded-md" size="30" />
						{label}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
