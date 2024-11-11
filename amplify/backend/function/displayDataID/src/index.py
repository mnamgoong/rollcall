import boto3
import json
from boto3.dynamodb.conditions import Key

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Replace 'your-table-name' with your actual table name
    table = dynamodb.Table('TripData-dev')

    # Extract 'id' (trip ID) from the event for the query
    id_value = event.get('id', None)
    if not id_value:
        return {
            'error': 'id is required in the request'
        }

    # Query the DynamoDB table based on 'id' as the partition key
    try:
        response = table.query(
            KeyConditionExpression=Key('id').eq(id_value)
        )

        items = response.get('Items', [])
        if not items:
            return {
                'message': 'No items found'
            }

        # Return all trip information as a regular JSON response
        trip_info = items[0]

        return trip_info

    except Exception as e:
        return {
            'error': f'Error querying the table: {str(e)}'
        }