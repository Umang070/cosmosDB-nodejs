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
containerId = "Items"
config = {
    "endpoint": "https://test-cosmos-db-data.documents.azure.com:443/",
    "primarykey": "igNoCXUZLwLfDlYZUrXXCy5XcWcqmZMkUZN1OWNz5yEQfyJtyVSNxXhikBTHi5wFx5cI9IsyfpzJACDb3w4QVg=="
}

# Create the cosmos client
client = cosmos_client.CosmosClient(url="https://test-cosmos-db-data.documents.azure.com:443/",
                                    credential={"masterKey":"igNoCXUZLwLfDlYZUrXXCy5XcWcqmZMkUZN1OWNz5yEQfyJtyVSNxXhikBTHi5wFx5cI9IsyfpzJACDb3w4QVg=="}
)
database = client.create_database_if_not_exists(databaseId)
container = database.create_container_if_not_exists(containerId,partition_key=False)
database_link = 'dbs/' + databaseId
collection_link = database_link + '/colls/' + containerId
df = pd.read_csv('test_data.csv')
# Reset index - creates a column called 'index'
df = df.reset_index()
# Rename that new column 'id'
# Cosmos DB needs one column named 'id'. 
df = df.rename(columns={'index':'id'})
# Convert the id column to a string - this is a document database.
df['id'] = df['id'].astype(str)
for i in range(0,df.shape[0]):
    # create a dictionary for the selected row
    data_dict = dict(df.iloc[i,:])
    # convert the dictionary to a json object.
    data_dict = json.dumps(data_dict,cls=NpEncoder)
    insert_data = container.upsert_item(json.loads(data_dict)
    )