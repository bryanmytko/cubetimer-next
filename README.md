# Cubetimer

A rebuild of the original Cubetimer in a modern framework.

Live site: [https://cubetimer.io](https://cubetimer.io)

### Development

Uses [Postgres](https://www.postgresql.org) (via Prisma) with GraphQL.

#### Database

A Postgres container is included via Docker Compose:

`docker compose up -d`

This starts Postgres 16 on `localhost:5432` with database `cubetimer` (user `postgres`, password `postgres`). Data is kept in the `pgdata` volume between restarts.

Point Prisma at it in `.env`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cubetimer"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/cubetimer"
```

Then apply the migrations:

`npx prisma migrate dev`

To stop the database, run `docker compose down` (add `-v` to also delete the data).

#### Running

Start the development server:

`npm run dev`

And visit in your browser: [http://0.0.0.0:3000](http://0.0.0.0:3000)
