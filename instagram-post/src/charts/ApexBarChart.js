import ReactApexChart from "react-apexcharts";

const ApexBarChart = (props) => {
  const sortedObj = Object.entries(props.countryWiseUsersObj)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  const sortedPosts = Object.entries(props.countryWisePostObj)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const series1 = Object.values(sortedObj);
  const lables = Object.keys(sortedObj);
  const series2 = Object.values(sortedPosts);
  const o = {
    series: [
      {
        data: series1.slice(0, 12),
        name: "Users",
      },
      {
        data: series2.slice(0, 12),
        name: "Posts",
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: {
        opacity: 1,
      },

      xaxis: {
        categories: lables.slice(0, 12),
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={o.options}
        series={o.series}
        type="bar"
        height={450}
      />
    </div>
  );
};
export default ApexBarChart;
