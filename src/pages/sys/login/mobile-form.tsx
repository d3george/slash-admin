import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReturnButton } from "./components/ReturnButton";
import { LoginStateEnum, useLoginStateContext } from "./providers/login-provider";

interface CountdownProps {
	value: number;
	onChange: (time: number) => void;
	onFinish: () => void;
}

function Countdown({ value, onChange, onFinish }: CountdownProps) {
	useEffect(() => {
		if (value <= 0) {
			onFinish();
			return;
		}

		const timer = setInterval(() => {
			onChange(value - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [value, onChange, onFinish]);

	return null;
}

interface MobileFormValues {
	phone: string;
	code: string;
}

function MobileForm() {
	const { t } = useTranslation();
	const [countdown, setCountdown] = useState(0);
	const [second, setSecond] = useState(0);
	const { loginState, backToLogin } = useLoginStateContext();

	const form = useForm<MobileFormValues>({
		defaultValues: {
			phone: "",
			code: "",
		},
	});

	if (loginState !== LoginStateEnum.MOBILE) return null;

	const start = () => {
		setCountdown(60);
		setSecond(60);
	};

	const reset = () => {
		setCountdown(0);
		setSecond(60);
	};

	const onFinish = (values: MobileFormValues) => {
		console.log("Received values of form: ", values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">{t("sys.login.mobileSignInFormTitle")}</h1>
				</div>

				<FormField
					control={form.control}
					name="phone"
					rules={{ required: t("sys.login.mobilePlaceholder") }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t("sys.login.mobile")}</FormLabel>
							<FormControl>
								<Input placeholder={t("sys.login.mobile")} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="code"
					rules={{ required: t("sys.login.smsPlaceholder") }}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center justify-between">
								<span className="text-sm">{t("sys.login.smsCode")}</span>
								<span className="text-sm text-muted-foreground" onClick={start}>
									{countdown === 0 ? (
										<span>{t("sys.login.sendSmsButton")}</span>
									) : (
										<div className="flex items-center justify-center">
											<Countdown
												value={countdown}
												onChange={(time) => {
													setCountdown(time);
													setSecond(time);
												}}
												onFinish={reset}
											/>
											<span className="ml-1">{t("sys.login.sendSmsText", { second })}</span>
										</div>
									)}
								</span>
							</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					{t("sys.login.loginButton")}
				</Button>

				<ReturnButton
					onClick={() => {
						reset();
						backToLogin();
					}}
				/>
			</form>
		</Form>
	);
}

export default MobileForm;
