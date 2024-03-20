# URL Shortener

Basic implementation of an url shortener service.

Given an `URL` - Uniform Resource Locator and a suggested `code` (shor text).
The service will store it and redirect to the `URL` with HTTP 301 everytime the corresponding `code` is GET.

Example input:
URL: `http://test.com`
CODE: `test`

### Endpoints implemented:

#### Create new URL code

`POST http://{server:port}/api/links`

Body:

```JSON
{
  "code": string,
  "url": string
}
```

#### Get all codes/urls

GET http://localhost:3333/api/links

#### Expand a code to its original URL

`POST http://{server:port}/{code}`

Body:

```JSON
{
  "code": string
}
```

#### Get metrics: Clicks (expanded code -> url)

`GET http://{server:port}/api/metrics`

### Built using

- Node.js
- Typescript
- Fastify
- PostgreSQL
- Redis

## Running

Requirements you must have already installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

1. Start PostgreSQL and Redis containers:
   `docker-compose up -d`

1. Initializing postgreSQL DB ( _only for the first run_ ):
   `npm setup-db`

1. Run server:
   `npm dev`

## TO-DO

- [ ] Safely store secrets - remove secrets from `docker-compose` file
