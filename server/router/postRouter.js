import express from "express";
const router = express.Router();
import { cosmosClient } from "../appController/appController.js";
import { appConfig } from "../appConfig/config.js";
import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017/";

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
    console.log(results[0]);
    res.send(results[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});
router.get("/getPostCategory", async (req, res) => {
  try {
    const start_of_cosmos = Date.now()
    const { result: results } = await container.items
      .query(
        "SELECT VALUE root FROM (SELECT COUNT(c.post_type), c.post_type FROM c GROUP BY c.post_type) as root",
        {
          enableCrossPartitionQuery: true,
        }
      )
      .toArray();
    console.log("122222221", results[0]);
    const end_of_cosmos = Date.now()
    console.log("cosmos time: ")
    console.log(end_of_cosmos-start_of_cosmos)
    const start_of_mongo = Date.now()
    MongoClient.connect(url, (err, db) => {
        if (err)
          throw err;
        var dbo = db.db("insta");
        dbo.collection("instadata").aggregate([
          { $group: { _id: "$post_type", count: { $sum: 1 } } },
        ]).toArray(function (err, result) {
        if (err)
          throw err;
        db.close();
        const end_of_mongo = Date.now();
        console.log("mongoDB time: ")
        console.log(end_of_mongo - start_of_mongo);
      });
      });
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
