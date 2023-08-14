from dotenv import load_dotenv
import os
import boto3
from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS class

# Load environment variables from .env file
load_dotenv()

# Access AWS credentials from environment variables
access_key = os.environ.get("AWS_ACCESS_KEY_ID")
secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")

# Create an S3 client
s3 = boto3.client('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_key)

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

# List All buckets from AWS
def list_buckets():
    response = s3.list_buckets()
    print(response)
    return response['Buckets']

# Get All Grants for each bucket
def check_bucket_public_access(bucket_name):
    response = s3.get_bucket_acl(Bucket=bucket_name)
    return response['Grants']

# Get all objects from a bucket by name
def list_bucket_objects(bucket_name):
    objects = []
    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=bucket_name)
    for page in pages:
        if 'Contents' in page:
            objects.extend(page['Contents'])
    return objects


# Get all objects permission
def get_object_permissions(bucket_name, object_key):
    response = s3.get_object_acl(Bucket=bucket_name, Key=object_key)
    
    if response['Grants']:
        permissions = response['Grants']
        return permissions
    else:
        return False


# Use Previous Functions to return data contains Buckets with permissions 
# And get objects inside each bucket with its own permissions
def get_all_bucket_data():
    buckets_data = []
    buckets = list_buckets()

    for bucket in buckets:
        bucket_data = {"name": bucket['Name'], "grants": check_bucket_public_access(bucket['Name'])}
        bucket_objects = list_bucket_objects(bucket['Name'])
        objects_data = []

        for obj in bucket_objects:
            obj_key = obj['Key']
            obj_permissions = get_object_permissions(bucket['Name'], obj_key)
            objects_data.append({"key": obj_key, "permissions": obj_permissions, "Size": obj['Size'], "StorageClass":obj['StorageClass']})
        
        bucket_data["objects"] = objects_data
        buckets_data.append(bucket_data)
    
    return buckets_data


########## Endpoints ##########

# Endpoint to return all Buckets
@app.route('/buckets', methods=['GET'])
def get_buckets():
    buckets_data = list_buckets()
    return jsonify(buckets_data)


# Endpoint to return all Objects
@app.route('/objects', methods=['GET'])
def get_objects():
    all_buckets = list_buckets()
    objects_data = []
    for bucket in all_buckets:
        objects_data.append(list_bucket_objects(bucket['Name']))
    
    return jsonify(objects_data)


# Make endpoint to return Json Contains all previous data
@app.route('/objects-permission', methods=['GET'])
def get_objects_permission():
    all_bucket_data = get_all_bucket_data()
    return jsonify(all_bucket_data)

# Run server at port 5000 from env file
app.run(host='localhost', port='5000')
