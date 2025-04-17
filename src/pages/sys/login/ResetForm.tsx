import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { ReturnButton } from "./components/ReturnButton";
import { LoginStateEnum, useLoginStateContext } from "./providers/LoginStateProvider";

function ResetForm() {
	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
	};

	const { t } = useTranslation();
	const { loginState, backToLogin } = useLoginStateContext();

	if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

	return (
		<>
			<div className="mb-8 text-center">
				<Icon icon="local:ic-reset-password" size="100" style={{ color: themeVars.colors.palette.primary.default }} />
			</div>
			<div className="mb-4 text-center text-2xl font-bold xl:text-3xl">{t("sys.login.forgetFormTitle")}</div>
			<Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
				<p className="mb-4 text-center text-gray">{t("sys.login.forgetFormSecondTitle")}</p>
				<Form.Item name="email" rules={[{ required: true, message: t("sys.login.emaildPlaceholder") }]}>
					<Input placeholder={t("sys.login.email")} />
				</Form.Item>
				<Form.Item>
					<Button variant="outline" size="lg" className="w-full bg-accent-foreground! text-accent! cursor-pointer">
						{t("sys.login.sendEmailButton")}
					</Button>
				</Form.Item>

				<ReturnButton onClick={backToLogin} />
			</Form>
		</>
	);
}

export default ResetForm;
