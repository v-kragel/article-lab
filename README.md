# ArticleLab

# 📚 Table of Contents

- [Project Setup](#project-setup)
- [Summary of Useful Scripts](#summary-of-useful-scripts)

## Project Setup

This monorepo contains two main parts: a Client (frontend) and a Server (backend). Follow the steps below to fully set up and launch the application for local development.

### Start the Local Database (PostgreSQL)

A PostgreSQL development database is managed via Docker. To start it:

1. `cd devdb`
2. `docker-compose up -d`

This will start PostgreSQL in a Docker container in detached mode. Make sure Docker is installed and running.

### Install frontend (client) dependencies

1. `cd client`
2. `yarn install`

### Install backend (server) dependencies

1. `cd server`
2. `yarn install`

### Apply Database Migrations

Run this to create/update your local database schema based on migrations:

1. `cd server`
2. `yarn db:migrate:local`

This uses prisma migrate dev and is intended for development only.

### Seed the database with initial data

Populate the database with initial test data:

1. `cd server`
2. `yarn db:seed`

Make sure the prisma/seed.ts file exists and works properly.

After completing these steps, the backend and frontend can be started.

### Reset the Local Database (Optional)

To drop and recreate your local DB with seed data (useful during development):

1. `cd server`
2. `yarn db:reset:local`

## Summary of Useful Scripts

- `yarn db:migrate:local` -> Applies latest migrations (dev)
- `yarn db:seed` -> Seeds the database with sample data
- `yarn db:reset:local` -> Drops & recreates the DB with seed data
