# E-commerce Backend API

This project is a backend API for an e-commerce application, built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, product management, and collection management.

## Features

- User authentication (register and login) using Supabase
- CRUD operations for products
- Collection management
- MongoDB integration for data storage
- Express.js for routing and middleware

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12.x or higher recommended)
- MongoDB installed and running
- Supabase account and project set up

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   SUPABASE_URL=<your-supabase-project-url>
   SUPABASE_KEY=<your-supabase-api-key>
   PORT=3001
   ```

## Usage

To start the server, run:

```
node backend/index.js
```
The server will start running on `http://localhost:3001` (or the port specified in your environment variables).

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user

### Products

- `POST /products/create`: Create a new product
- `GET /products`: Get all products
- `GET /products/:id`: Get a single product by ID
- `GET /products/filter`: Filter products based on various criteria
- `PUT /products/:id`: Update a product
- `DELETE /products/:id`: Delete a product

### Collections

- `POST /collections/create`: Create a new collection
- `GET /collections`: Get all collections
- `GET /collections/:id`: Get a single collection by ID

## Models

### Product

- name (String, required, unique)
- collectionId (ObjectId, reference to Collection)
- images (Array of Strings, 1-4 images required)
- price (Number, required)
- discountPrice (Number, optional)
- colors (Array of Strings)
- sizes (Array of Strings)
- featured (Boolean, default: false)

### Collection

- name (String, required, unique)
- description (String)

## Contributing

Contributions to this project are welcome. Please ensure to update tests as appropriate.

## License

[ISC](https://choosealicense.com/licenses/isc/)

