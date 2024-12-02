const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

// Add global error handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Initialize Express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    stack: err.stack
  });
});

// Initialize DynamoDB client before any routes
const ddbClient = new DynamoDBClient({ 
    region: process.env.REGION,
    maxAttempts: 3
});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Health check endpoint
app.get('/health', function(req, res) {
  res.json({ status: 'healthy' });
});

// GET endpoint to retrieve all trip data
app.get('/gettrips', async function(req, res) {
  console.log('GET /gettrips endpoint hit');
  
  try {
    const tableName = process.env.STORAGE_TRIPDATA_NAME || 'TripData-dev';
    console.log('Using table name:', tableName);
    
    const params = {
      TableName: tableName
    };

    const data = await ddbDocClient.send(new ScanCommand(params));
    console.log('Scan successful, items:', JSON.stringify(data.Items));

    // Transform the data to include only the required fields
    const transformedData = data.Items.map(item => ({
      id: item.id,
      tripName: item.tripName || item.title || '', // Handle both field names
      mainDestination: item.mainDestination || item.location || '', // Handle both field names
      startDate: item.startDate || '', // Handle both field names
      endDate: item.endDate || '',
      status: item.status || 'PENDING'
    }));

    return res.status(200).json({
      success: true,
      data: transformedData
    });

  } catch (err) {
    console.error('Detailed error:', {
      message: err.message,
      code: err.code,
      name: err.name,
      stack: err.stack
    });
    
    return res.status(500).json({
      success: false,
      error: 'Database operation failed',
      details: {
        message: err.message,
        code: err.code
      }
    });
  }
});

// Export app
module.exports = app;