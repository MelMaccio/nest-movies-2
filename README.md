# SWAPI Movies with Nest JS

This is a simple CRUD API developed with Nest Js framwork. It implements authentication with JWT for security. It consumes data from SWAPI (https://swapi.dev/)

---

## Table of Contents

1. [Installation](#installation)
2. [Environmental variables](#environmental-variables)
3. [Running the Application](#running-the-application)
4. [Swagger Documentation](#swagger-documentation)
5. [License](#license)

---

## Requirements

- Node Js
- MySql

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MelMaccio/nest-movies-2.git
   cd nest-movies-2
   ```
2. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables

You need to provide the correct value for the environment variables in the .env file:

   ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=your_user_name
    DB_PASSWORD=yourpassword
    DB_NAME=your_db_name

    JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Start the app: The app will run on http://localhost:3000.

   ```bash
   npm run start
   ```
2. (Optional) To run the application in development mode with hot reloading, use:

   ```bash
   npm run start:dev
   ```

## Swagger Documentation

**Note**: For agile testing purposes the expiration time of the JWT Tokens has been set to 1 minute.

http://localhost:3000/api

This documentation provides an interactive way to explore and test all the available endpoints.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
