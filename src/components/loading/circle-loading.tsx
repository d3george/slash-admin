import { Spin } from 'antd';

export function CircleLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
