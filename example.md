# Example

```javascript

const { startFHM, configFHM, sendOtp, verifyOtp } = require('flexhostmail');

// Configure the framework with necessary values
configFHM('your_mailgun_api_key', 'your_mailgun_domain', 'your_redis_host', 'your_redis_password');

// Start the framework
startFHM();

// Send OTP to a user
sendOtp('user@example.com', 'john_doe')
  .then((otp) => {
    console.log(`OTP sent successfully: ${otp}`);
    // ... logic to send OTP via email
  })
  .catch((error) => {
    console.error(`Failed to send OTP: ${error}`);
  });

// Verify OTP
verifyOtp('user@example.com', '123456', 'john_doe')
  .then(() => {
    console.log('OTP verified successfully');
    // ... logic for successful OTP verification
  })
  .catch((error) => {
    console.error(`OTP verification failed: ${error}`);
    // ... logic for failed OTP verification
  });

```  
