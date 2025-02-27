# Astro Http Server Actions

## Technologies

- Astro 5.1.5
- Node 20.12.2
- Tailwind CSS
- PostgreSQL (NeonDB)
- Isla con Vue.js

## Variables de entorno

- Crear el .env en base al template con las credenciales de la base de datos

## Install dependencies

```bash
npm install
```

## Start in Dev Mode

```bash
npm run dev
```

## Build to Production

```bash
npm run build
```

## Prisma

```bash
npx prisma init   

npx prisma db pull 

npx prisma generate

```

## Api Endpoints

### GET Clients

```bash
curl --location 'http://localhost:4321/api/clients'
```

### POST Client

```bash
curl --location 'http://localhost:4321/api/clients' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Cande",
    "age": 9,
    "is_active": false
}'
```