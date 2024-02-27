# Email OTP Verification System

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
![workflow](https://github.com/IntegerAlex/flexhostmail/actions/workflows/main.yml/badge.svg)

## Project Purpose

This Node.js project provides a system for secure email OTP (One-Time Password) generation, sending, and verification. It is designed for demonstration and learning purposes.
It uses Fastify over Express :  To focus on speed and efficiency, Fastify is optimized to handle a high volume of requests, making it an ideal choice for performance-critical applications where response time is a key factor.

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

### Start  

```bash
    `node index.js`
```

```zsh
    `it listen to port localhost:9543` expose port according to your requirement
```

### License

This project is licensed under the GNU General Public License v3.0 . Note that using the GPL license has implications for how others can use and distribute your code.  
