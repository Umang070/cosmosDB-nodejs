// Provide required connection from environment variables
import * as dotenv from "dotenv";
dotenv.config();
const authKey = process.env.COSMOS_KEY;
// Endpoint format: https://YOUR-RESOURCE-NAME.documents.azure.com:443/
const endpoint = process.env.COSMOS_ENDPOINT;
import { CosmosClient } from "@azure/cosmos";
import initDatabaseAndContainer from "../appUtility/appUtility.js";

export const cosmosClient = new CosmosClient({
  endpoint: endpoint,
  auth: {
    masterKey: authKey,
  },
  consistencyLevel: "Session",
});
