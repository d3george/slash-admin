import { Icon } from "@/components/icon";
import { Switch } from "@/ui/switch";

type Props = {
	isText: boolean;
	isMulti: boolean;
	onChnageText: (isText: boolean) => void;
	onChangeMulti: (isMulti: boolean) => void;
	onRefresh: VoidFunction;
};
export default function Toolbar({ isText, isMulti, onChnageText, onChangeMulti, onRefresh }: Props) {
	return (
		<div className="mb-4 flex items-center justify-between">
			<div>
				<Switch checked={isText} onCheckedChange={onChnageText} />
				<span className="ml-2">Text Object</span>
			</div>
			{isText ? null : (
				<div className="mr-4">
					<Switch checked={isMulti} onCheckedChange={onChangeMulti} />
					<span className="ml-2">Multi Item</span>
				</div>
			)}
			<Icon icon="material-symbols:refresh" className="cursor-pointer" size={24} onClick={onRefresh} />
		</div>
	);
}
