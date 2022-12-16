import pandas as pd 
import json
import azure.cosmos.cosmos_client as cosmos_client
import numpy as np

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)
print('Imported packages successfully.')

# Initialize the Cosmos client
databaseId = "ToDoList"
containerId = "Instagram-container"
config = {
    "endpoint": "https://test-cosmos-db-data.documents.azure.com:443/",
    "primarykey": "igNoCXUZLwLfDlYZUrXXCy5XcWcqmZMkUZN1OWNz5yEQfyJtyVSNxXhikBTHi5wFx5cI9IsyfpzJACDb3w4QVg=="
}

# Create the cosmos client
client = cosmos_client.CosmosClient(url="https://test-cosmos-db-data.documents.azure.com:443/",
                                    credential={"masterKey":"igNoCXUZLwLfDlYZUrXXCy5XcWcqmZMkUZN1OWNz5yEQfyJtyVSNxXhikBTHi5wFx5cI9IsyfpzJACDb3w4QVg=="}
)
database = client.create_database_if_not_exists(databaseId)
container = database.create_container_if_not_exists(containerId,partition_key="dir_country_name")
database_link = 'dbs/' + databaseId
collection_link = database_link + '/colls/' + containerId
f = open('test.json')
# # Reset index - creates a column called 'index'
# df = df.reset_index()
# # Rename that new column 'id'
# # Cosmos DB needs one column named 'id'. 
# df = df.rename(columns={'index':'id'})
# Convert the id column to a string - this is a document database.
# df['id'] = df['id'].astype(str)
item_s = json.load(f)
print(item_s[0])
# for i in range(0,len(item_s)):
#     # convert the dictionary to a json object.
#     # data_dict = json.dumps(data_dict,cls=NpEncoder)
#     insert_data = container.upsert_item(item_s[i]
#     )
# items = container.query_items(
#         query='SELECT * FROM c ',
#         enable_cross_partition_query=True)
      
# documents = []
# for i in items:
#     delete = container.delete_item(i["id"],partition_key=False)