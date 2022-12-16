import ReactApexChart from "react-apexcharts";

const ApexBarChart = (props) => {
  const sortedObj = Object.entries(props.countryWisePostsObj)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  const series1 = Object.values(sortedObj);
  const lables = Object.keys(sortedObj);
  const o = {
    series: [
      {
        data: series1.slice(0, 10),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      title: {
        text: "Countries with the most instagram users",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: lables.slice(0, 10),
        title: {
          text: "Country names",
        },
      },
      yaxis: {
        title: {
          text: "No of Users",
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={o.options}
        series={o.series}
        type="bar"
        height={420}
      />
    </div>
  );
};
export default ApexBarChart;
