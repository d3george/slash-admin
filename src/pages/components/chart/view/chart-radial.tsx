import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';
import { fNumber } from '@/utils/format-number';

const series = [44, 55];
export default function ChartRadial() {
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels: ['Apples', 'Oranges'],
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '68%',
        },
        dataLabels: {
          value: {
            offsetY: 16,
          },
          total: {
            formatter: () => fNumber(2324),
          },
        },
      },
    },
  });

  return <Chart type="radialBar" series={series} options={chartOptions} height={320} />;
}
