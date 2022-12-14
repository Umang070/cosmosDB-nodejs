from azure.storage.blob import BlobServiceClient

account_key ="acVJQBdMrNCDVBbQD+7UgGxggXcocGXZ9dZRd1axPYu5WvOCBUIIhsRY7EUo3+3y/MFWAglSQbKb+AStT2U6CA=="
account_name = "instagramstore"
connection_str = "DefaultEndpointsProtocol=https;AccountName=instagramstore;AccountKey=acVJQBdMrNCDVBbQD+7UgGxggXcocGXZ9dZRd1axPYu5WvOCBUIIhsRY7EUo3+3y/MFWAglSQbKb+AStT2U6CA==;EndpointSuffix=core.windows.net"
container_name = "instagramdata"
def upload(path,name):
    service_client = BlobServiceClient.from_connection_string(connection_str)
    client = service_client.get_blob_client(container = container_name, blob = name)
    with open(path,'rb') as data:
        client.upload_blob(data)
    print("done")
    
# upload('seven_chunk.json',"seven_chunk.json")
# upload('eight_chunk.json',"eight_chunk.json")
