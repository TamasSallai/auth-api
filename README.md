# Authentication API

## Description

This Authentication API is for handling user authentication. It features endpoints for login, registration, and fetching user data.
Written in TypeScript, it uses Express for the server framework, Zod for request validation, Prisma as the database ORM and Redis for session management.

## Features

- `/login`: Authenticate users.
- `/register`: Register new users.
- `/me`: Retrieve authenticated user data.
- TypeScript for strong typing and maintainability.
- Express server for handling HTTP requests.
- Zod for rigorous request validation.
- Prisma ORM for database interactions.
- Redis for session management.

## Installation

1. Clone the repository:

```
git clone https://github.com/TamasSallai/auth-api.git
```

2. Install dependencies:

```
npm install
```

3. Set environment variables in a .env file. Copy the .env.example file if needed.
4. Start Redis and PostgreSQL databases with the included docker-compose file:

```
docker-compose up -d
```

5. Run Prisma migrations:

```
npx prisma migrate dev
```

6. To start server in development mode run:

```
npm run dev
```

7. To create a production build and start the server run:

```
npm start
```

## Configuration

- Configure database settings in prisma/schema.prisma.
- Set up Redis and other environment variables in .env.

## Usage

- To register a user, send a `POST` request to `/register` with username, password, and other required fields.
- To login, send a `POST` request to `/login` with username and password. This will initiate a session.
- Access user data by sending a `GET` request to `/me` with the session token.

## Acknowledgements

- TypeScript: typescriptlang.org
- Express: expressjs.com
- Prisma: prisma.io
- Zod: zod.dev
- Redis: redis.io
