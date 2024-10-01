# URL Shortener

This project is a URL shortener application built with a React frontend and an Express backend. It allows users to shorten URLs, protect them with passwords, and manage them through a RESTful API.

> **Important:** For demo purposes, the original URL is displayed directly on the home page. For normal usage, you should exclude the original URL property from the response object sent from the server to the client.

## Setup Instructions

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Client Setup

1. Navigate to the `client` directory:

    ```sh
    cd client
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file based on `.env.example` and configure the environment variables:

    ```sh
    cp .env.example .env
    ```

4. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

### Server Setup

1. Navigate to the `server` directory:

    ```sh
    cd server
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file based on `.env.example` and configure the environment variables:

    ```sh
    cp .env.example .env
    ```

4. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

## Technology Choices

-   **Frontend**: React with TypeScript, Vite for bundling, and React Router for routing.
-   **Backend**: Express with TypeScript for type-safety, Mongoose for MongoDB interactions, and express-validator for request validation.
-   **Styling**: Material-UI for UI components.
-   **Linting**: ESLint with TypeScript support.

## Completed Features

-   URL shortening
-   Password protection for URLs
-   RESTful API for managing URLs
-   Basic frontend for interacting with the API
-   Environment variable management
-   Linting and formatting setup

## Known Issues or Limitations

-   The frontend does not have error handling.
-   The backend does not have comprehensive test coverage.
-   The password protection feature does not support advanced hashing mechanisms.
-   The application does not support user authentication and authorization.

## Ideas for Future Improvements

-   Implement user authentication and authorization.
-   Add comprehensive error handling on the frontend.
-   Improve the password protection feature with hashing mechanisms.
-   Add test coverage for both frontend and backend.
-   Implement a more sophisticated UI/UX for the frontend.
-   Add analytics to track URL usage.
-   Implement rate limiting to prevent abuse of the URL shortening service.
