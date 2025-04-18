import { Icon } from "@/components/icon";

type Props = {
	onRefresh: VoidFunction;
};
export default function Toolbar({ onRefresh }: Props) {
	return (
		<div className="mb-4 flex items-center justify-end" onClick={onRefresh}>
			<Icon icon="material-symbols:refresh" className="cursor-pointer" size={24} />
		</div>
	);
}
