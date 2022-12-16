const express = require('express');
const app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/', async (req, res) => {
  start_of_cosmos = Date.now()
  count = 0
  // Import database node module
  const CosmosClientInterface = require("@azure/cosmos").CosmosClient;
  // Database and container IDs
  const databaseId = "ToDoList";
  const containerId = "Instagram-container";
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
    const { container } = await database.containers.createIfNotExists({id: containerId,partitionKey:"dir_country_name"});
    // const newItemId = Math.floor(Math.random() * 1000 + 10).toString();
    // let documentDefinition =  {"post_id":"Bsgwm-oFWhX","cts_x":"2019-01-11 17:58:02.000","post_type":1,"number_likes":42,"number_comments":0,"profile_name":"serenazilio.mua","following":949,"followers":522,"n_posts":451,"is_business_account":true,"name":"La Proseccheria","dir_city_name":"Padua","dir_country_name":"Italy","lat":11.87435,"lng":45.40847,"cts_y":"2019-05-26 16:48:28.205"};
    // Add a new item to the container
    console.log("** Create item **");
    //to add data to container
    // var json = require('./five_chunk.json')
    // for (let i = 0; i < json.length; i++) {
    //   count++
    //   const createResponse = await container.items.create(json[i]);
    // }
    const {result:results} = await container.items.query("SELECT * FROM c WHERE c.post_id='BwrBVceAQrb'", {enableCrossPartitionQuery: true}).toArray();
    console.log(results);
    end_of_cosmos = Date.now()
    console.log("cosmos time: "+end_of_cosmos-start_of_cosmos)
    start_of_mongo = Date.now()
    MongoClient.connect(url, (err, db) => {
        if (err)
          throw err;
        var dbo = db.db("insta");
        dbo.collection("instadata").find({ post_id: "BwrBVceAQrb" }).toArray(function (err, result) {
        if (err)
          throw err;
        db.close();
        end_of_mongo = Date.now();
        console.log("mongoDB time: " +end_of_mongo - start_of_mongo);
      });
      });
    
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with database query: " + error.body);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))