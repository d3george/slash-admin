import { Progress } from 'antd';
import { useEffect, useState } from 'react';

import { useThemeToken } from '@/theme/hooks';

export function LineLoading() {
  const { colorTextBase } = useThemeToken();
  const [percent, setPercent] = useState(10);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (increasing) {
        setPercent((prevPercent) => prevPercent + 20);
        if (percent === 100) {
          setIncreasing(false);
        }
      } else {
        setPercent(0);
        setIncreasing(true);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [percent, increasing]);

  return (
    <div className="m-auto flex h-full w-96 items-center justify-center">
      <Progress
        percent={percent}
        trailColor="rgba(145, 158, 171, 0.2)"
        strokeColor={colorTextBase}
        showInfo={false}
        size="small"
      />
    </div>
  );
}
