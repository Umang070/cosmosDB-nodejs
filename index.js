const express = require('express');
const app = express()

app.get('/', async (req, res) => {
  // Import database node module
  const CosmosClientInterface = require("@azure/cosmos").CosmosClient;
  // Database and container IDs
  const databaseId = "ToDoList";
  const containerId = "Items";
  // Configure database access URI and primary key
  const endpoint = "https://test-cosmos-db-data.documents.azure.com:443/";
  const authKey = "igNoCXUZLwLfDlYZUrXXCy5XcWcqmZMkUZN1OWNz5yEQfyJtyVSNxXhikBTHi5wFx5cI9IsyfpzJACDb3w4QVg==";
  // Instantiate the cosmos client, based on the endpoint and authorization key
  const cosmosClient = new CosmosClientInterface({
    endpoint: endpoint,
    auth: {
      masterKey: authKey
    },
    consistencyLevel: "Session"
  });
  try {
    // Open a reference to the database
    const dbResponse = await cosmosClient.databases.createIfNotExists({
      id: databaseId
    });
    var database = dbResponse.database;
    const { container } = await database.containers.createIfNotExists({id: containerId});
    const newItemId = Math.floor(Math.random() * 1000 + 10).toString();
    let documentDefinition = {
    "id": newItemId,
    "color": "Gray",
    "value": "#f7f"
    };
    // Add a new item to the container
    console.log("** Create item **");
    //to add data to container
    // const createResponse = await container.items.create(documentDefinition);
    // console.log(createResponse.body);
        const {result:results} = await container.items.query("SELECT * FROM c WHERE c.color='Gray'", {enableCrossPartitionQuery: true}).toArray();
    // const queryResponse = await container.items.query(
    //     "SELECT * FROM c",).toArray();
        console.log(results);
    // const docResponse = await container.items.readAll().toArray();
    // console.log(docResponse);
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with database query: " + error.body);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))