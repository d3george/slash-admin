import Chart from '@/components/chart/chart';
import useChart from '@/components/chart/useChart';

const series = [44, 55, 13, 43];
export default function ChartDonut() {
  const chartOptions = useChart({
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    stroke: {
      show: false,
    },
    legend: {
      horizontalAlign: 'center',
    },
    tooltip: {
      fillSeriesColor: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
        },
      },
    },
  });

  return <Chart type="donut" series={series} options={chartOptions} height={320} />;
}
