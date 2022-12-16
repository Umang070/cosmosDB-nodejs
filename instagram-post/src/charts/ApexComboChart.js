import ReactApexChart from "react-apexcharts";

const ApexComboChart = (props) => {
  const o = {
    series: [
      {
        name: "Followers",
        type: "column",
        data: props.profileData.followersData
          .sort((a, b) => b - a)
          .slice(0, 12),
      },
      {
        name: "No of Post",
        type: "line",
        data: props.profileData.postData.sort((a, b) => b - a).slice(0, 12),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: "Instagram influencers",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: props.profileData.lables.slice(0, 12),
      //   xaxis: {
      //     type: 'datetime'
      //   },
      yaxis: [
        {
          title: {
            text: "No of Followers (millions)",
          },

          labels: {
            formatter: function (value) {
              var val = Math.abs(value);
              if (val >= 1000000) {
                val = (val / 1000000).toFixed(0) + " m";
              }
              return val;
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "No of Post",
          },
        },
      ],
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={o.options}
        series={o.series}
        type="line"
        height={350}
      />
    </div>
  );
};
export default ApexComboChart;
