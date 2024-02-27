# Learning Flexhostmail

Welcome to Flexhostmail! This guide will help you understand and use the features of this project effectively.

## Project Overview

Flexhostmail is a Node.js framework designed for building secure email-based OTP (One-Time Password) verification systems. It provides essential components such as OTP generation, Redis integration for storage, and reliable email transmission via Mailgun.

## Features

- **OTP Generation:** Easily generate secure, random OTP codes.
- **Redis Integration:** Leverage Redis for storing OTPs and related data for fast retrieval.
- **Mailgun Integration:** Use Mailgun as the email service provider for sending OTPs.

## Getting Started

1. Clone the repository: `git clone https://github.com/IntegerAlex/flexhostmail.git`.
2. Install dependencies: `npm install`.
3. Create a `.env` file with required configurations.
4. Start the Flexhostmail server: `node index.js`.

## Usage Example

To generate and verify an OTP, follow these steps:

1. Configure Flexhostmail: Use `configFHM` to set up your Mailgun and Redis details.
2. Start Flexhostmail: Execute `startFHM` to begin the server.
3. Generate OTP: Use `sendOtp` with an email and username.
4. Verify OTP: Utilize `verifyOtp` with the OTP, email, and username.

## Roadmap

Check the project's [GitHub repository](https://github.com/IntegerAlex/flexhostmail) for planned features and enhancements.

## Contributing

Contributions are welcome! Read the [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on reporting bugs, requesting features, and submitting changes.


Happy learning!
