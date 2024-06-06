# MXAgro Backend

MXAgro Backend is a scalable RESTful API for managing products, reviews, vendors, users, and orders in a multivendor ecommerce store. Built with Node.js, Express, and MongoDB, it ensures secure, efficient, and reliable services.

## Features

- Secure user authentication and authorization
- Product, review, vendor, and order management
- Comprehensive error handling
- Rate limiting to prevent abuse
- Detailed logging for monitoring and troubleshooting
- Data validation with express-validator
- Secure HTTP headers with Helmet
- Response compression with compression

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Winston for logging
- Helmet for security
- Express-rate-limit for rate limiting
- Express-validator for data validation
- CORS for handling cross-origin requests
- Compression for response compression
- Cookie-parser for parsing cookies

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AbdulBima/MxAgro_Backend.git
    cd mxagro_backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URL=your_mongo_db_connection_string
    PORT=your_preferred_port
    FRONTEND=http://yourfrontendurl.com
    FRONTEND1=http://anotherfrontendurl.com
    FRONTEND2=http://yetanotherfrontendurl.com
    ```

4. **Start the server:**

    - For development:

        ```bash
        npm run dev
        ```

    - For production:

        ```bash
        npm run serve
        ```

## Usage

Once the server is running, you can access the API endpoints. The base URL is `http://localhost:your_port/api`.

## Types of Applications that can be built with MXAgro Backend

- Multivendor Ecommerce Platform: Use MXAgro Backend to build the backend of a multivendor ecommerce platform, enabling vendors to sell their products, users to browse and purchase items, and administrators to manage the platform efficiently.

- Online Marketplace: Develop an online marketplace application leveraging MXAgro Backend, allowing users to buy and sell various goods and services through a centralized platform, with features such as user authentication, product management, and order processing.

- Inventory Management System: Utilize MXAgro Backend to create an inventory management system for businesses, enabling efficient tracking and management of products, orders, and inventory levels, with features such as real-time updates and reporting capabilities.

- Service Booking Platform: Build a service booking platform using MXAgro Backend, allowing users to book and schedule services from various service providers, with features such as user profiles, service listings, booking management, and payment processing.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
