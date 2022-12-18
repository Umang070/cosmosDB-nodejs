import * as React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import ApexBarChart from "../charts/ApexBarChart";
import ApexComboChart from "../charts/ApexComboChart";
import ApexDonutChart from "../charts/ApexDonutChart";
import ApexLineChart from "../charts/ApexLineChart";
import ApexPieChart from "../charts/ApexPieChart";
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiCode,
  EuiText,
  EuiFlexGrid,
} from "@elastic/eui";
const Home = () => {
  const [postList, setPostList] = useState([]);

  const [categoryData, setCategoryList] = useState({ series: [], lables: [] });
  const [countryWiseUsers, setCountryWiseUsers] = useState({});
  const [followersWiseUsers, setFollowersWiseUsers] = useState({});
  const [profileData, setProfileData] = useState({});
  const [businessAccCount, setBusinessAccCount] = useState(0);
  const [nonBusinessAccCount, setNonBusinessAccCount] = useState(0);
  const [countryWisePostCount, setCountryWisePostCount] = useState({});

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
    const countryWiseUserRes = await api.get("/post/getCountryUsers", config);
    const countryWiseUserCount = {};
    const countryWistCount = {};
    countryWiseUserRes.data?.forEach((obj) => {
      if (!countryWiseUserCount[obj.dir_country_name]) {
        countryWiseUserCount[obj.dir_country_name] = 1;
        countryWisePostCount[obj.dir_country_name] = obj.post_count;
      } else {
        countryWiseUserCount[obj.dir_country_name] += 1;
        countryWisePostCount[obj.dir_country_name] += obj.post_count;
      }
    });
    setCountryWiseUsers(countryWiseUserCount);
    setCountryWisePostCount(countryWisePostCount);
    console.log(
      "CountryWise data ",
      countryWiseUserCount,
      countryWisePostCount
    );
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
    console.log("Profile info:", profileInfo);
  };
  const fetchAccountType = async () => {
    const config = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    };
    const accountTypeRes = await api.get("/post/getAccountType", config);
    let business_acc = 0;
    let non_business_acc = 0;
    accountTypeRes.data.forEach(({ is_business_account }) => {
      if (is_business_account) {
        business_acc += 1;
      } else {
        non_business_acc += 1;
      }
    });
    console.log(non_business_acc, business_acc);
    setBusinessAccCount(business_acc);
    setNonBusinessAccCount(non_business_acc);
  };
  useEffect(() => {
    console.log("Called Only Once");
    // fetchData();
    // fetchInfluencers();
    fetchCountryUsers();
    // fetchAccountType();
  }, []);

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexGroup>
        <EuiFlexItem grow={1}>
          <EuiPanel>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup direction="column">
                  <EuiText
                    style={{
                      fontWeight: "bold",
                      fontSize: "35px",
                      color: "powderblue",
                      display: "flex",
                      textAlign: "center",
                    }}
                  >
                    Business Account
                  </EuiText>
                  <EuiText
                    style={{
                      color: "#3ea6fb",
                      fontSize: "xxx-large",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "56px",
                    }}
                  >
                    {businessAccCount}
                  </EuiText>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGroup direction="column">
                  <EuiText
                    style={{
                      fontSize: "30px",
                      color: "#82ef82",
                      fontWeight: "bold",
                      display: "flex",
                      textAlign: "center",
                    }}
                  >
                    Non-Business Account
                  </EuiText>
                  <EuiText
                    style={{
                      color: "rgb(93, 240, 12)",
                      fontSize: "xxx-large",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "56px",
                    }}
                  >
                    {nonBusinessAccCount}
                  </EuiText>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
        {categoryData.series.length > 0 && (
          <EuiFlexItem grow={1}>
            <EuiPanel>
              <EuiText
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "26px",
                  color: "#a69d9d",
                  fontWeight: "500",
                }}
              >
                {" "}
                Type of post{" "}
              </EuiText>

              <ApexDonutChart
                series={categoryData.series}
                lables={categoryData.lables}
              />
            </EuiPanel>
          </EuiFlexItem>
        )}
        {Object.keys(followersWiseUsers).length > 0 && (
          <EuiFlexItem grow={1}>
            <EuiPanel>
              <EuiText
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "26px",
                  color: "#a69d9d",
                  fontWeight: "500",
                }}
              >
                Followers Distribution
              </EuiText>
              <ApexPieChart followersWiseUsers={followersWiseUsers} />
            </EuiPanel>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
      {Object.keys(countryWiseUsers).length > 0 && (
        <EuiFlexItem>
          <EuiPanel>
            <EuiText
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "26px",
                color: "#a69d9d",
                fontWeight: "500",
              }}
            >
              Countries with the most instagram users
            </EuiText>
            <ApexBarChart
              countryWiseUsersObj={countryWiseUsers}
              countryWisePostObj={countryWisePostCount}
            />
          </EuiPanel>
        </EuiFlexItem>
      )}
      {Object.keys(followersWiseUsers).length > 0 && (
        <EuiFlexItem>
          <EuiPanel>
            <EuiText
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "26px",
                color: "#a69d9d",
                fontWeight: "500",
              }}
            >
              Instagram influencers
            </EuiText>
            <ApexComboChart profileData={profileData} />
          </EuiPanel>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
};

export default Home;
