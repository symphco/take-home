# Infisical take home coding assignment

<!--toc:start-->

- [Infisical take home coding assignment](#infisical-take-home-coding-assignment)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Code base walk though](#code-base-walk-though)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
  - [Database Migrations](#database-migrations)
    - [Migration Commands](#migration-commands)
  - [Services Overview](#services-overview)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Database](#database)
    - [Other helpful Services](#other-helpful-services)
      - [pgAdmin](#pgadmin)
      - [SMTP Server](#smtp-server)
  - [Local Access Links](#local-access-links)
  - [Development Commands](#development-commands) - [Install Dependencies](#install-dependencies) - [Build and Start Services](#build-and-start-services) - [Stop and Remove Services](#stop-and-remove-services)
  <!--toc:end-->

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Services Overview](#services-overview)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Database](#database)
- [Local Access Links](#local-access-links)
- [Development Commands](#development-commands)

---

## Overview

This is a full-stack application boilerplate by Infisical careers team with the following components:

- **Backend:** An API built with **Express.js**.
- **Frontend:** A user interface built with **React.js**.
- **Database:** A **PostgreSQL** database with query operations powered by **Knex.js**.
- **Docker Compose:** Used to orchestrate all services in the development environment.

### Code base walk though

[![Image Alt Text](./video-talk-though.png)](https://infisical.wistia.com/medias/sb00s1tmpf)

---

## Prerequisites

Before starting, make sure you have the following tools installed on your system:

1. **Docker** (v20.10 or higher)  
   [Install Docker](https://docs.docker.com/get-docker/)

2. **Docker Compose** (v1.29 or higher)  
   Docker Desktop typically includes Docker Compose.

3. **Node.js** (v20 or higher)  
   Required for installing dependencies locally. [Download Node.js](https://nodejs.org/)

---

## Setup Instructions

1. **Download the repository:**

   - Go to the repository's page on GitHub.
   - Click the green "Code" button and select "Download ZIP."
   - Extract the ZIP file to your desired location.

2. **Navigate to the project directory:**

   ```bash
   cd <extracted-folder>
   ```

3. **Install dependencies:**

   Run the following commands to install dependencies for the frontend and backend:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. **Start the development environment:**

   Run the following command from the root of the project directory:

   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

5. **To stop the environment:**

   Run the following command:

   ```bash
   docker compose -f docker-compose.dev.yml down
   ```

---

## Database Migrations

The backend uses **Knex.js** for managing database migrations. Database migrations help manage creating, updating and deleting table schemas. Below are the commands for creating, applying, and rolling back migrations.

> [!NOTE]  
> The Docker Compose file includes a `db-migration` service that automatically runs pending migrations when the application starts.

### Migration Commands

From the `server` directory, use the following commands:

- **Create a new database tables:**

  ```bash
  npm run migration:new
  ```

- **Run all pending migrations:**

  ```bash
  npm run migration:latest
  ```

- **Rollback the last batch of migrations:**

  ```bash
  npm run migration:rollback
  ```

- **Check the status of migrations:**

  ```bash
  npm run migration:status
  ```

- **Unlock stuck migrations:**

  ```bash
  npm run migration:unlock
  ```

## Services Overview

### Backend

- **Description:** The backend is built with **Express.js**
- **Code Directory:** `./server`
- **Port Mapping:**  
  Externally accessible on `http://localhost:8000`
- **Database Integration:**  
  The backend connects to the PostgreSQL database using **Knex.js** for query operations.
- **Environment Variables:**
  - `NODE_ENV=development`
  - `DB_CONNECTION_URI=postgres://infisical:infisical@localhost/infisical?sslmode=disable`

---

### Frontend

- **Description:** The frontend is a **React.js** application.
- **Code Directory:** `./client`
- **Port Mapping:**  
  Externally accessible on `http://localhost:3000`

---

### Database

- **Description:** The database is **PostgreSQL**, used to store and manage persistent data.
- **Image:** `postgres:16-alpine`
- **Port Mapping:**  
  Externally accessible on `localhost:5432`
- **Query Builder:**  
  **Knex.js** is used to manage migrations and queries in the backend.
- **Credentials:**
  - **Username:** `infisical`
  - **Password:** `infisical`
  - **Database Name:** `infisical`
- **Volume:**  
  Data is persisted in the `postgres-data` volume.

---

### Other helpful Services

#### pgAdmin

- **Description:** A web-based management tool for PostgreSQL. This will help you quickly view your DB tables.
- **Port Mapping:**  
  Accessible on `http://localhost:5050`
- **Default Credentials:**
  - **Email:** `admin@example.com`
  - **Password:** `pass`

#### SMTP Server

- **Description:** If you are adding any SMTP functionality and need to test sending/receiving emails, use this service.
- **Port Mapping:**
  - SMTP: `localhost:1025`
  - Web UI: `http://localhost:8025`

---

## Local Access Links

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:3000](http://localhost:3000) |
| Backend     | [http://localhost:8000](http://localhost:8000) |
| PostgreSQL  | `localhost:5432` (via psql or client tools)    |
| pgAdmin     | [http://localhost:5050](http://localhost:5050) |
| SMTP Web UI | [http://localhost:8025](http://localhost:8025) |

---

## Development Commands

### Install Dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### Build and Start Services

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Stop and Remove Services

```bash
docker compose -f docker-compose.dev.yml down
```

Default Ports

1. Frontend (React): 3000
2. Backend (Express): 8000
3. PostgreSQL: 5432
4. SMTP dev server: 1025
