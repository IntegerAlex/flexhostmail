# FlexHost Mail (FMH) Documentation

Using flexhostmail via NPM

```javascript
npm install flexhostmail
```

 configFHM Function
 The configFHM function is responsible for configuring the essential parameters required for the FlexHost Mail (FMH) system.

```javascript
import { configFHM } from 'flexhostmail';
configFHM('your-mailgun-api-key', 'your-mailgun-domain', 'your-redis-host', 'your-redis-password');
```

Description
The configFHM function sets up the required environment variables, including Mailgun API key, Mailgun domain, Redis host, and Redis password. These configurations are crucial for the proper functioning of the FMH system.

Parameters:

1. mailgunApiKey (string): The API key provided by Mailgun for email services.
2. mailgunDomain (string): The Mailgun domain associated with your Mailgun account.
3. redisHost (string): The host address of the Redis database.
4. redisPassword (string): The password for accessing the Redis database.

 **Important Note**
This function must be called before starting the FMH server using startFMH.

## startFMH Function

The startFMH function initializes and starts the FlexHost Mail (FMH) server.

```javascript
import { startFMH } from 'flexhostmail';
// Start the FMH server
startFMH();
```

Description
The startFMH function initializes the FMH server, making it ready to handle incoming requests. It's a crucial step to ensure that your FlexHost Mail system is up and running.  

## sendOtp Function

The sendOtp function sends a one-time password (OTP) to a specified email address.

```javascript
import { sendOtp } from 'flexhostmail';

// Send OTP to the specified email and username
sendOtp('user@example.com', 'username');
```

Description
The sendOtp function generates and sends a one-time password (OTP) to the provided email address. It requires the email address and username as parameters.

**Parameters**
email (string): The email address to which the OTP will be sent.
username (string): The username associated with the email address.

## verifyOtp Function

The verifyOtp function validates a user-provided OTP against the stored OTP for a given email and username.

```javascript
import { verifyOtp } from 'flexhostmail';
// Verify the provided OTP for the specified email and username
verifyOtp('user@example.com', 'username', 123456);
```

Description
The verifyOtp function checks if the provided OTP matches the stored OTP for the specified email and username.

**Parameters**
email (string): The email address for which the OTP was sent.
username (string): The username associated with the email address.
otp (number): The one-time password provided by the user for verification.

**This function assumes that the FMH system is properly configured using configFHM before usage.**.

**See example**
[Check Example](./example.md)
