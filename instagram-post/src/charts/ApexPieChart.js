import ReactApexChart from "react-apexcharts";

const ApexPieChart = (props) => {
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    title: {
      text: "Followers count distribution",
    },
    labels: Object.keys(props.followersWiseUsers),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };
  const series = Object.values(props.followersWiseUsers);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={380}
      />
    </div>
  );
};
export default ApexPieChart;
