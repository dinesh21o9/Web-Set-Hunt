const axios = require('axios');

// Configuration
const url = 'https://asia-south2-wsh2025.cloudfunctions.net/wsh2025-service/api/auth/login';
const totalRequests = 500;
const concurrentRequests = 100; // Adjust based on your needs
const requestData = {
  email: "swn.himanshu@gmail.com",
  password: "12341234"
};

// Track progress
let completedRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;

// Function to make a single request
async function makeRequest() {
  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    successfulRequests++;
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    failedRequests++;
    return {
      success: false,
      status: error.response?.status || 'Unknown',
      message: error.message
    };
  } finally {
    completedRequests++;
    updateProgress();
  }
}

// Function to update and display progress
function updateProgress() {
  const percentComplete = (completedRequests / totalRequests * 100).toFixed(2);
  process.stdout.write(`\rProgress: ${completedRequests}/${totalRequests} (${percentComplete}%) - Success: ${successfulRequests}, Failed: ${failedRequests}`);
}

// Function to process requests in batches
async function processInBatches() {
  console.log(`Starting to send ${totalRequests} requests to ${url}`);
  console.log(`Processing in batches of ${concurrentRequests} concurrent requests\n`);
  
  const startTime = Date.now();
  
  for (let i = 0; i < totalRequests; i += concurrentRequests) {
    const batch = [];
    const batchSize = Math.min(concurrentRequests, totalRequests - i);
    
    for (let j = 0; j < batchSize; j++) {
      batch.push(makeRequest());
    }
    
    await Promise.all(batch);
  }
  
  const endTime = Date.now();
  const totalTime = (endTime - startTime) / 1000;
  
  console.log('\n\nTest Completed!');
  console.log('----------------');
  console.log(`Total requests: ${totalRequests}`);
  console.log(`Successful requests: ${successfulRequests}`);
  console.log(`Failed requests: ${failedRequests}`);
  console.log(`Total time: ${totalTime.toFixed(2)} seconds`);
  console.log(`Requests per second: ${(totalRequests / totalTime).toFixed(2)}`);
}

// Run the script
processInBatches().catch(error => {
  console.error('An error occurred:', error.message);
});