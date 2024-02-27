# Email OTP Verification System

## Project Purpose

This Node.js project provides a system for secure email OTP (One-Time Password) generation, sending, and verification. It is designed for demonstration and learning purposes. However, it's essential to note that a robust security review is necessary before considering it for production use.

## Features

- **OTP Generation:** Generates secure, random OTP codes.
- **Email Integration:** Sends OTPs to users via email. Requires configuration with an email provider (Mailgun is supported).
- **OTP Storage & Validation:** Securely stores OTPs as hashes in Redis for fast retrieval and validation(Redis is Required).

## Setup

### Prerequisites

- Node.js
- npm
- Mailgun account
- Running Redis instance

### Instructions

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file (never committed to version control) with the following fields:

   ```plaintext
   MAILGUN_API_KEY=your_mailgun_api_key
   REDISHOST=your_redis_hostname_or_ip
   REDISPASSWORD=your_redis_password

### License

This project is licensed under the GNU General Public License v3.0 ([or another GPL version if you prefer]). Note that using the GPL license has implications for how others can use and distribute your code. 
