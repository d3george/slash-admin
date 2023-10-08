import { Timeline, Typography } from 'antd';

import { useThemeToken } from '@/theme/hooks';

export default function AnalysisOrderTimeline() {
  const theme = useThemeToken();
  return (
    <Timeline
      items={[
        {
          color: theme.colorPrimary,
          children: (
            <div className="flex flex-col">
              <Typography.Text strong>1983, orders,$4220</Typography.Text>
              <Typography.Text type="secondary" className="text-xs">
                08 Oct 2023 7:19 PM
              </Typography.Text>
            </div>
          ),
        },
        {
          color: theme.colorPrimaryActive,
          children: (
            <div className="flex flex-col">
              <Typography.Text strong>12 Invoices have been paid</Typography.Text>
              <Typography.Text type="secondary" className="text-xs">
                07 Oct 2023 6:19 PM
              </Typography.Text>
            </div>
          ),
        },
        {
          color: theme.colorInfo,
          children: (
            <div className="flex flex-col">
              <Typography.Text strong>Order #37745 from September</Typography.Text>
              <Typography.Text type="secondary" className="text-xs">
                06 Oct 2023 5:19 PM
              </Typography.Text>
            </div>
          ),
        },
        {
          color: theme.colorWarning,
          children: (
            <div className="flex flex-col">
              <Typography.Text strong>New order placed #XF-2356</Typography.Text>
              <Typography.Text type="secondary" className="text-xs">
                05 Oct 2023 4:19 PM
              </Typography.Text>
            </div>
          ),
        },
        {
          color: theme.colorError,
          children: (
            <div className="flex flex-col">
              <Typography.Text strong>New order placed #XF-2346</Typography.Text>
              <Typography.Text type="secondary" className="text-xs">
                04 Oct 2023 3:19 PM
              </Typography.Text>
            </div>
          ),
        },
      ]}
    />
  );
}
