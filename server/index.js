import express from "express";
import cors from "cors";

import postRouter from "./router/postRouter.js";
const app = express();
app.use(cors()); // Use this after the variable declaration
app.use(express.json());

app.get("/", async (req, res) => {
  res.send({ message: "Application is up and running!" });
  //  const CosmosClientInterface = require("@azure/cosmos").CosmosClient;
  //  // Database and container IDs
  //  const databaseName = "";
  //  const containerName = "";
  //  // Configure database access URI and primary key
  //  const endpoint = "";
  //  const authKey ="";
  //  // Instantiate the cosmos client, based on the endpoint and authorization key
  //  const cosmosClient = new CosmosClientInterface({
  //    endpoint: endpoint,
  //    auth: {
  //      masterKey: authKey,
  //    },
  //    consistencyLevel: "Session",
  //  });

  // try {
  //   const dbResponse = await cosmosClient.databases.createIfNotExists({
  //     id: databaseName,
  //   });
  //   const database = dbResponse.database;
  //   console.log(`Database Created ${database}`);
  //   // ends here

  //   // create a container if not exist

  //   const containerResponse = await database.containers.createIfNotExists({
  //     id: containerName,
  //     partitionKey: "",
  //   });
  //   const container = containerResponse.container;

  //   // Add a new item to the container
  //   console.log("* Create item *");
  //   //to add data to container
  //   // const createResponse = await container.items.create(JSONObjet);
  //   // console.log(createResponse.body);
  //   const result = await container.items
  //     .query("SELECT * FROM c WHERE c.country='India'", {
  //       enableCrossPartitionQuery: true,
  //     })
  //     .toArray();
  //   // const queryResponse = await container.items.query(
  //   //     "SELECT * FROM c",).toArray();
  //   console.log(result.results);
  //   // const docResponse = await container.items.readAll().toArray();
  //   // console.log(docResponse);
  //   res.send(result.results);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Error with database query: " + error.body);
  // }
});

app.use("/post", postRouter);

app.listen(5000, () => console.log("Example app listening on port 5000!"));
