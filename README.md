# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
npm install
```

### Docker-Compose

Run the following command to run startup migrations.

```
docker-compose up -d
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```