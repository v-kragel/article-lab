# ArticleLab

Monorepo: **Client** (frontend) and **Server** (NestJS + Prisma, PostgreSQL).

---

## Table of Contents

- [Project setup](#project-setup)
- [Database & Prisma](#database--prisma)
  - [1. Launch the database](#1-launch-the-database)
  - [2. Run database seed](#2-run-database-seed)
  - [3. Reset the database (development only)](#3-reset-the-database-development-only)
  - [4. Update Prisma after schema changes](#4-update-prisma-after-schema-changes)
- [Useful scripts](#useful-scripts)

---

## Project setup

### 1. Start the local database

See [§ 1. Launch the database](#1-launch-the-database) below.

### 2. Client (frontend)

```bash
cd client
yarn install
```

### 3. Server (backend)

```bash
cd server
yarn install
mkdir -p logs
```

Create a `.env` in `server/` (or copy from `.env.example` if present) and set `DATABASE_URL` so it matches your PostgreSQL credentials (same as in `devdb/.env` when using Docker):

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>"
```

Then apply migrations and optionally seed:

```bash
yarn db:migrate:local
yarn db:seed
```

---

## Database & Prisma

The server uses **Prisma 7** with `prisma.config.ts`. Schema: `server/prisma/schema.prisma`. Migrations: `server/prisma/migrations/`. Seed entry: `server/prisma/seed.ts` (runs `ts-node ./prisma/seed.ts` via config).

All commands below are run from the **server** directory (`cd server`).

---

### 1. Launch the database

PostgreSQL is run via Docker in `devdb/`.

1. **Create `devdb/.env`** (copy from `devdb/.env.example`) and set:
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
   - Optional: `PGADMIN_*` if you use pgAdmin

2. **Start the stack:**
   ```bash
   cd devdb
   docker-compose up -d
   ```

3. **Point Prisma at the DB:** in `server/.env` set `DATABASE_URL` using the same user, password, and database, for example:
   ```env
   DATABASE_URL="postgresql://postgres_user_name:postgres_user_password@localhost:5432/postgres_db_name"
   ```

4. **Apply migrations (create/update schema):**
   ```bash
   cd server
   yarn db:migrate:local
   ```
   This runs `prisma migrate dev` and applies all migrations in `prisma/migrations/`.

After this, the DB is up and the schema is in sync. Optionally run [§ 2. Run database seed](#2-run-database-seed).

---

### 2. Run database seed

Seeding uses `prisma/seed.ts` (configured in `prisma.config.ts` as `ts-node ./prisma/seed.ts`). It calls the seed logic in `prisma/seeds/` (e.g. `seed-fields`).

From the **server** directory:

```bash
yarn db:seed
```

Or directly:

```bash
yarn prisma db seed
```

Ensure migrations have been applied first (`yarn db:migrate:local`).

---

### 3. Reset the database (development only)

**⚠️ Destroys all data.** Use only in development.

From the **server** directory:

```bash
yarn db:reset:local
```

This runs `prisma migrate reset --force`: drops the database, reapplies all migrations, and runs the seed (if configured). No confirmation prompt because of `--force`.

Do **not** use this against shared or production databases.

---

### 4. Update Prisma after schema changes

After editing `server/prisma/schema.prisma`:

**Option A – Create and apply a migration (recommended for dev and production):**

```bash
cd server
yarn prisma migrate dev --name describe_your_change
```

Example: `yarn prisma migrate dev --name add_article_slug`

This will:

- Create a new migration under `prisma/migrations/`
- Apply it to the current database
- Regenerate the Prisma Client (output in `server/generated/prisma` per your schema)

**Option B – Sync schema without a migration (quick prototyping only):**

```bash
yarn prisma db push
```

Use only for local experimentation. It does not create migration files and is not suitable for production.

**Regenerate Prisma Client only** (e.g. after pulling migrations):

```bash
yarn prisma generate
```

`migrate dev` already runs this; use `generate` when you only need to refresh the client (e.g. after `git pull`).

---

## Useful scripts

All from **server** directory unless noted.

| Command | Description |
|--------|-------------|
| `yarn db:migrate:local` | Apply migrations (dev). |
| `yarn db:seed` | Run seed script. |
| `yarn db:reset:local` | **Dev only.** Drop DB, re-apply migrations, run seed. |
| `yarn prisma migrate dev --name <name>` | Create and apply a new migration. |
| `yarn prisma generate` | Regenerate Prisma Client. |
| `yarn prisma db push` | Sync schema to DB without migration (prototyping). |
| `yarn prisma studio` | Open Prisma Studio in the browser. |

**Dev database (from repo root):**

| Command | Description |
|--------|-------------|
| `cd devdb && docker-compose up -d` | Start PostgreSQL (and pgAdmin). |
| `cd devdb && docker-compose down` | Stop containers. |
