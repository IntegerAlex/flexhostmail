// Purpose: This file is used to check the health of the FHM server by sending a request to the health endpoint.
import { startFHM } from './index';

const HEALTH_CHECK_URL = "http://localhost:9543/health";

startFHM();

async function checkHealth() {
    try {
      console.log("Attempting health check...");
      const response = await fetch(HEALTH_CHECK_URL, { method: 'GET' });
  
      if (response.status === 200 && response.statusText === 'OK') {
        console.log("Health check successful!");
        process.exit(0);
      } else {
        console.error("Health check failed! Unexpected response:", response.status, response.statusText);
        process.exit(1);
      }
    } catch (error) {
      console.error("Health check failed due to error:", error);
      process.exit(1);
    }
  }
  
  // The following line should be removed to avoid an undefined 'exit' error.
  // exit(0);
  
  checkHealth();
  


