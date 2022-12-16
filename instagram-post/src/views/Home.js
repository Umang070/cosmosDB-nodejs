import * as React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import ApexBarChart from "../charts/ApexBarChart";
import ApexComboChart from "../charts/ApexComboChart";
import ApexDonutChart from "../charts/ApexDonutChart";
import ApexLineChart from "../charts/ApexLineChart";
import ApexPieChart from "../charts/ApexPieChart";
const Home = () => {
  const [postList, setPostList] = useState([]);

  const [categoryData, setCategoryList] = useState({ series: [], lables: [] });
  const [countryWisePosts, setCountryWisePost] = useState({});
  const [followersWiseUsers, setFollowersWiseUsers] = useState({});
  const [profileData, setProfileData] = useState({});
  const fetchData = async () => {
    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const categoryRes = await api.get("/post/getPostCategory", config);
    const postCategoryData = { series: [], lables: [] };
    categoryRes.data.forEach((post) => {
      postCategoryData.series.push(post["$1"]);
      postCategoryData.lables.push(post["post_type"]);
    });
    setCategoryList(postCategoryData);
  };
  const fetchCountryUsers = async () => {
    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const countryWisePostRes = await api.get("/post/getCountryPosts", config);
    const countryWisePostsCount = {};
    countryWisePostRes.data?.forEach((obj) => {
      if (!countryWisePostsCount[obj.dir_country_name]) {
        countryWisePostsCount[obj.dir_country_name] = obj["$1"];
      } else {
        countryWisePostsCount[obj.dir_country_name] += obj["$1"];
      }
    });
    setCountryWisePost(countryWisePostsCount);
  };
  const fetchInfluencers = async () => {
    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };

    const res = await api.get("/post/getInstaInfluencer", config);
    const followersWiseCount = {
      "1-1k": 0,
      "1k-10k": 0,
      "10k-50k": 0,
      "50k-100k": 0,
      "100k-500k": 0,
      "500k+": 0,
    };
    const profileInfo = { lables: [], postData: [], followersData: [] };
    res.data.forEach(({ post_count, followers, profile_name }) => {
      if (followers > 1 && followers < 1000) {
        followersWiseCount["1-1k"] += 1;
      } else if (followers >= 1000 && followers < 10000) {
        followersWiseCount["1k-10k"] += 1;
      } else if (followers >= 10000 && followers < 50000) {
        followersWiseCount["10k-50k"] += 1;
      } else if (followers >= 50000 && followers < 100000) {
        followersWiseCount["50k-100k"] += 1;
      } else if (followers >= 100000 && followers < 500000) {
        followersWiseCount["100k-500k"] += 1;
      } else {
        followersWiseCount["500k+"] += 1;
      }
      profileInfo["lables"].push(profile_name);
      profileInfo["followersData"].push(followers);
      profileInfo["postData"].push(post_count);
    });
    setFollowersWiseUsers(followersWiseCount);
    setProfileData(profileInfo);
  };
  useEffect(() => {
    console.log("Called Only Once");
    fetchData();
    fetchInfluencers();
    fetchCountryUsers();
  }, []);

  return (
    <>
      {categoryData.series.length > 0 && (
        <ApexDonutChart
          series={categoryData.series}
          lables={categoryData.lables}
        />
      )}
      {Object.keys(countryWisePosts).length > 0 && (
        <ApexBarChart countryWisePostsObj={countryWisePosts} />
      )}
      {Object.keys(followersWiseUsers).length > 0 && (
        <>
          <ApexPieChart followersWiseUsers={followersWiseUsers} />
          <ApexComboChart profileData={profileData} />
        </>
      )}
    </>
  );
};

export default Home;
