import express from "express";
const router = express.Router();
import { cosmosClient } from "../appController/appController.js";
import { appConfig } from "../appConfig/config.js";

const container = cosmosClient
  .database(appConfig.databaseId)
  .container(appConfig.containerId);
router.get("/getPost", async (req, res) => {
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

router.get("/getCountryPosts", async (req, res) => {
  try {
    const { result: results } = await container.items
      .query(
        "SELECT VALUE root FROM (SELECT c.dir_country_name,COUNT(c.post_id) FROM c GROUP BY c.dir_country_name, c.profile_name) as root",
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
        "SELECT VALUE root FROM (SELECT MAX(c.followers) as followers, COUNT(c.post_id) as post_count, c.profile_name FROM c GROUP BY c.profile_name) as root",
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

export default router;
