import { appConfig } from "../appConfig/config.js";

const initDatabaseAndContainer = async (cosmosClient) => {
  // create database if not exist
  const dbResponse = await cosmosClient.databases.createIfNotExists({
    id: appConfig.databaseId,
  });
  const database = dbResponse.database;
  console.log(`Database Created ${database}`);
  // ends here

  // create a container if not exist

  const containerResponse = await database.containers.createIfNotExists({
    id: appConfig.containerId,
    partitionKey: "dir_country_name",
  });
  const container = containerResponse.container;
  console.log(`Container Created ${container}`);

  return {
    database: database,
    container: container,
  };
  // ends here
};

export default initDatabaseAndContainer;
