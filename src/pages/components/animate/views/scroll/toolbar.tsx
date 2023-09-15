import { ReloadOutlined } from '@ant-design/icons';

type Props = {
  onRefresh: VoidFunction;
};
export default function Toolbar({ onRefresh }: Props) {
  return (
    <div className="mb-4 flex items-center justify-end">
      <ReloadOutlined className="cursor-pointer text-lg" onClick={onRefresh} />
    </div>
  );
}
