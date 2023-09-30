import { ApexOptions } from 'apexcharts';
import { mergeDeepRight } from 'ramda';

import { useThemeToken } from '@/theme/hooks';

export default function useChart(options: ApexOptions) {
  const theme = useThemeToken();

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: theme.colorTextSecondary,
    fontSize: theme.fontSizeHeading2,
    lineHeight: theme.lineHeightHeading2,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.colorText,
    fontSize: theme.fontSizeHeading3,
    lineHeight: theme.lineHeightHeading3,
  };

  const baseOptions = {
    // Colors
    colors: [
      theme.colorPrimary,
      theme.colorWarning,
      theme.colorInfo,
      theme.colorError,
      theme.colorSuccess,
      theme.colorWarningActive,
      theme.colorSuccessActive,
      theme.colorInfoActive,
      theme.colorInfoText,
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme.colorTextDisabled,
      fontFamily: theme.fontFamily,
    },

    // States
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: {
      enabled: false,
    },

    // Stroke
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: theme.colorSplit,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
    },

    // Tooltip
    tooltip: {
      theme: false,
      x: {
        show: true,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: 13,
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: {
        horizontal: 8,
      },
      labels: {
        colors: theme.colorText,
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        borderRadius: 4,
        columnWidth: '28%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },

      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },

      // Radialbar
      radialBar: {
        track: {
          strokeWidth: '100%',
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },

      // Radar
      radar: {
        polygons: {
          fill: { colors: ['transparent'] },
          strokeColors: theme.colorSplit,
          connectorColors: theme.colorSplit,
        },
      },

      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.colorSplit,
        },
        spokes: {
          connectorColors: theme.colorSplit,
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: theme.screenSM,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } },
        },
      },
      {
        // md
        breakpoint: theme.screenMD,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } },
        },
      },
    ],
  };

  return mergeDeepRight(baseOptions, options) as ApexOptions;
}
