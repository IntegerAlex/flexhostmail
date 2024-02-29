# Email OTP Verification System

[![CodeScene Code Health](https://codescene.io/projects/50433/status-badges/code-health)](https://codescene.io/projects/50433)
![workflow](https://github.com/IntegerAlex/flexhostmail/actions/workflows/main.yml/badge.svg)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/8456/badge)](https://www.bestpractices.dev/projects/8456)
![NPM Version](https://img.shields.io/npm/v/flexhostmail)

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
   MAILGUN_DOMAIN=your_mailgun_domain

### Start  

```bash
    `node index.js`
```

```zsh
    `it listen to port localhost:9543` expose port according to your requirement
```

[documentations](./docs.md)

### License
