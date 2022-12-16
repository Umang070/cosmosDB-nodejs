import express from "express";
const router = express.Router();
import { cosmosClient } from "../appController/appController.js";
import { appConfig } from "../appConfig/config.js";

const container = cosmosClient
  .database(appConfig.databaseId)
  .container(appConfig.containerId);
router.get("/getPostCount", async (req, res) => {
  try {
    const { result: results } = await container.items
      .query("SELECT * FROM c where c.dir_country_name = 'Italy'", {
        enableCrossPartitionQuery: true,
      })
      .toArray();
    console.log("122222221", results[0]);
    res.send(results[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});
router.get("/getPostCategory", async (req, res) => {
  try {
    const { result: results } = await container.items
      .query(
        "SELECT VALUE root FROM (SELECT COUNT(c.post_type), c.post_type FROM c GROUP BY c.post_type) as root",
        {
          enableCrossPartitionQuery: true,
        }
      )
      .toArray();
    console.log("122222221", results[0]);
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get("/getCountryUsers", async (req, res) => {
  try {
    const { result: results } = await container.items
      .query(
        "SELECT VALUE root FROM (SELECT c.dir_country_name,COUNT(c.post_id) as post_count FROM c GROUP BY c.dir_country_name, c.profile_name) as root",
        {
          enableCrossPartitionQuery: true,
        }
      )
      .toArray();
    console.log("122222221", results[0]);
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get("/getInstaInfluencer", async (req, res) => {
  try {
    const { result: results } = await container.items
      .query(
        "SELECT VALUE root FROM (SELECT MAX(c.followers) as followers, MAX(c.n_posts) as post_count, c.profile_name FROM c GROUP BY c.profile_name) as root",
        {
          enableCrossPartitionQuery: true,
        }
      )
      .toArray();
    console.log("122222221", results[0]);
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.get("/getAccountType", async (req, res) => {
  try {
    const { result: results } = await container.items
      .query(
        "SELECT VALUE root FROM (SELECT c.is_business_account,COUNT(c.post_id) as post_count FROM c GROUP BY c.profile_name,c.is_business_account) as root",
        {
          enableCrossPartitionQuery: true,
        }
      )
      .toArray();
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

export default router;
