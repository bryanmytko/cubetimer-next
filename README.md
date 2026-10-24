# Cubetimer

A rebuild of the original Cubetimer in a modern framework.

Live site: [https://cubetimer.io](https://cubetimer.io)

### Development

Uses [Postgres](https://www.postgresql.org) (via Prisma) with GraphQL.

#### Database

A Postgres container is included via Docker Compose:

`docker compose up -d`

This starts Postgres 16 on `localhost:5432` with database `cubetimer` (user `postgres`, password `postgres`). Data is kept in the `pgdata` volume between restarts.

To stop the database, run `docker compose down` (add `-v` to also delete the data).

#### Environment

Create a `.env` with the following:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cubetimer"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/cubetimer"

NEXTAUTH_SECRET=   # any random string, e.g. `openssl rand -base64 32`
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Sign-in uses GitHub and Google OAuth. For it to work locally, add these as allowed callback URLs in each OAuth app:

- `http://localhost:3000/api/auth/callback/github`
- `http://localhost:3000/api/auth/callback/google`

Then apply the migrations:

`npx prisma migrate dev`

#### Running

Start the development server:

`npm run dev`

And visit in your browser: [http://localhost:3000](http://localhost:3000)
