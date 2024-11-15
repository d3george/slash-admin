import { ReloadOutlined } from "@ant-design/icons";
import { Switch } from "antd";

type Props = {
	isText: boolean;
	isMulti: boolean;
	onChnageText: (isText: boolean) => void;
	onChangeMulti: (isMulti: boolean) => void;
	onRefresh: VoidFunction;
};
export default function Toolbar({
	isText,
	isMulti,
	onChnageText,
	onChangeMulti,
	onRefresh,
}: Props) {
	return (
		<div className="mb-4 flex items-center justify-between">
			<div>
				<Switch checked={isText} onChange={onChnageText} />
				<span className="ml-2">Text Object</span>
			</div>
			<div className="flex items-center">
				{isText ? null : (
					<div className="mr-4">
						<Switch checked={isMulti} onChange={onChangeMulti} />
						<span className="ml-2">Multi Item</span>
					</div>
				)}
				<ReloadOutlined
					className="cursor-pointer text-lg"
					onClick={onRefresh}
				/>
			</div>
		</div>
	);
}
