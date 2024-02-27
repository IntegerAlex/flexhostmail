import axios from 'axios';
import { startFHM } from './index';

const HEALTH_CHECK_URL = "http://localhost:9543/health";

startFHM();

async function checkHealth() {
  try {
    console.log("Attempting health check...");
    const response = await axios.get(HEALTH_CHECK_URL);

    if (response.status === 200 && response.data === 'OK') {
      console.log("Health check successful!");
    } else {
      console.error("Health check failed! Unexpected response:", response.data);
      process.exit(1);
    }
  } catch (error) {
    console.error("Health check failed due to error:", error);
    process.exit(1);
  }
}

checkHealth();
