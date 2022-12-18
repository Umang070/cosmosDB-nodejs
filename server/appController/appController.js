// Provide required connection from environment variables
import * as dotenv from "dotenv";
dotenv.config();
// const authKey = process.env.COSMOS_KEY;
// Endpoint format: https://YOUR-RESOURCE-NAME.documents.azure.com:443/
// const endpoint = process.env.COSMOS_ENDPOINT;

const endpoint = "https://test-cosmos-db-data.documents.azure.com:443/";
const authKey = "igNoCXUZLwLfDlYZUrXXCy5XcWcqmZMkUZN1OWNz5yEQfyJtyVSNxXhikBTHi5wFx5cI9IsyfpzJACDb3w4QVg==";
import { CosmosClient } from "@azure/cosmos";
import initDatabaseAndContainer from "../appUtility/appUtility.js";

export const cosmosClient = new CosmosClient({
  endpoint: endpoint,
  auth: {
    masterKey: authKey,
  },
  consistencyLevel: "Session",
});
