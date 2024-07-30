export const options: any = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      labels: {
        font: {
          family: 'Inter',
          size: 82,
          weight: 'lighter',
        },
      },
    },
  },

  scales: {
    x: {
      display: true,
      border: {
        color: 'transparent',
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      display: true,
      border: {
        color: 'transparent',
      },
      grid: {
        display: false,
      },
    },
  },
  borderColor: '#FFFFFF',
  backgroundColor: '#FFFFFF',
};
