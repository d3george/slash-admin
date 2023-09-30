import ApexChart from 'react-apexcharts';

import { useSettings } from '@/store/settingStore';

import { StyledApexChart } from './styles';

import type { Props as ApexChartProps } from 'react-apexcharts';

export default function Chart(props: ApexChartProps) {
  const { themeMode } = useSettings();
  return (
    <StyledApexChart thememode={themeMode}>
      <ApexChart {...props} />
    </StyledApexChart>
  );
}
