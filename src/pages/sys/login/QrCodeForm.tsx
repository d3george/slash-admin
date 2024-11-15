import { QRCode } from "antd";
import { useTranslation } from "react-i18next";

import { ReturnButton } from "./components/ReturnButton";
import {
	LoginStateEnum,
	useLoginStateContext,
} from "./providers/LoginStateProvider";

function QrCodeFrom() {
	const { t } = useTranslation();
	const { loginState, backToLogin } = useLoginStateContext();

	if (loginState !== LoginStateEnum.QR_CODE) return null;
	return (
		<>
			<div className="mb-4 text-2xl font-bold xl:text-3xl">
				{t("sys.login.qrSignInFormTitle")}
			</div>
			<div className="flex w-full flex-col items-center justify-center">
				<QRCode value="https://ant.design/" size={300} />
				<p className="my-4 text-sm">{t("sys.login.scanSign")}</p>
			</div>
			<ReturnButton onClick={backToLogin} />
		</>
	);
}

export default QrCodeFrom;
