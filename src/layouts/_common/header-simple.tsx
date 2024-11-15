import Logo from "@/components/logo";

import SettingButton from "./setting-button";

export default function HeaderSimple() {
	return (
		<header className="flex h-16 w-full items-center justify-between px-6">
			<Logo size={30} />
			<SettingButton />
		</header>
	);
}
