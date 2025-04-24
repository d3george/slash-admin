import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { ReturnButton } from "./components/ReturnButton";
import { LoginStateEnum, useLoginStateContext } from "./providers/login-provider";

function QrCodeFrom() {
	const { t } = useTranslation();
	const { loginState, backToLogin } = useLoginStateContext();

	if (loginState !== LoginStateEnum.QR_CODE) return null;
	return (
		<>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">{t("sys.login.qrSignInFormTitle")}</h1>
				<p className="text-balance text-sm text-muted-foreground">{t("sys.login.scanSign")}</p>
			</div>

			<div className="flex w-full flex-col items-center justify-center p-4">
				<QRCodeSVG value="https://github.com/d3george/slash-admin" size={200} />
			</div>
			<ReturnButton onClick={backToLogin} />
		</>
	);
}

export default QrCodeFrom;
