import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { useTranslation } from "react-i18next";

interface ReturnButtonProps {
	onClick?: () => void;
}
export function ReturnButton({ onClick }: ReturnButtonProps) {
	const { t } = useTranslation();
	return (
		<Button variant="link" onClick={onClick} className="w-full cursor-pointer text-accent-foreground">
			<Icon icon="solar:alt-arrow-left-linear" size={24} />
			<span className="text-sm">{t("sys.login.backSignIn")}</span>
		</Button>
	);
}
