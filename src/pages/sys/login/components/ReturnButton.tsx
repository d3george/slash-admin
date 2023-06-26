import { Button } from 'antd';
import { MdArrowBackIosNew } from 'react-icons/md';

interface ReturnButtonProps {
  onClick?: () => void;
}
export function ReturnButton({ onClick }: ReturnButtonProps) {
  return (
    <Button block type="link" onClick={onClick}>
      <div className="flex items-center justify-center text-black hover:underline">
        <MdArrowBackIosNew />
        <span className="text-sm">返回</span>
      </div>
    </Button>
  );
}
