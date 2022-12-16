import ReactApexChart from "react-apexcharts";

const ApexDonutChart = (props) => {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Image", "Video"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2) + "%";
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      //   horizontalAlign: "center",
    },
  };
  const series = props.series;

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={250}
      />
    </div>
  );
};
export default ApexDonutChart;
