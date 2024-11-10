import json
import boto3
import os
from datetime import datetime
import traceback

def handler(event, context):
    try:
        # Print the incoming event for debugging
        print(f"Received event: {json.dumps(event)}")
        
        # Get the table name from environment variables
        table_name = os.environ.get('STORAGE_TRIPDATA_NAME')
        print(f"Table name: {table_name}")
        
        # Initialize DynamoDB client
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(table_name)
        
        # Parse the incoming JSON data
        request_body = json.loads(event['body'])
        print(f"Parsed request body: {json.dumps(request_body)}")
        
        # Process each trip in the trips array
        for trip in request_body['trips']:
            print(f"Processing trip: {json.dumps(trip)}")
            trip['createdAt'] = datetime.now().isoformat()
            trip['updatedAt'] = datetime.now().isoformat()
            table.put_item(Item=trip)
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            'body': json.dumps({
                'message': 'Trip data stored successfully',
                'data': request_body['trips']
            })
        }
        
    except Exception as e:
        # Print full error details
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            'body': json.dumps({
                'message': f'Error: {str(e)}'
            })
        }