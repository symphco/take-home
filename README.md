# Symph Take Home Coding Assignment

<!--toc:start-->

- [Symph Take Home Coding Assignment](#symph-take-home-coding-assignment)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Architecture](#architecture)
    - [Technology Stack](#technology-stack)
    - [Code Base Structure](#code-base-structure)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
    - [Detailed Setup Steps](#detailed-setup-steps)
    - [Troubleshooting Common Setup Issues](#troubleshooting-common-setup-issues)
  - [Database Management](#database-management)
    - [Database Schema](#database-schema)
    - [Migration Commands](#migration-commands)
    - [Data Seeding](#data-seeding)
  - [Services Overview](#services-overview)
    - [Backend (Express.js)](#backend-expressjs)
    - [Frontend (React.js)](#frontend-reactjs)
    - [Database (PostgreSQL)](#database-postgresql)
    - [Development Tools](#development-tools)
      - [pgAdmin](#pgadmin)
      - [SMTP Server](#smtp-server)
  - [Local Access Links](#local-access-links)
  - [Development Workflow](#development-workflow)
    - [Install Dependencies](#install-dependencies)
    - [Build and Start Services](#build-and-start-services)
    - [Stop and Remove Services](#stop-and-remove-services)
  - [Contributing Guidelines](#contributing-guidelines)
  - [Support and Contact](#support-and-contact)
  <!--toc:end-->

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Management](#database-management)
- [Services Overview](#services-overview)
- [Local Access Links](#local-access-links)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing Guidelines](#contributing-guidelines)
- [Support and Contact](#support-and-contact)

---

## Overview

This is a comprehensive full-stack application boilerplate created by the Symph careers team. It provides a solid foundation for building modern web applications with industry-standard practices and tools.

### Architecture

The application follows a modern microservices architecture with:

- Clear separation of concerns between frontend and backend
- RESTful API design principles
- Containerized services for consistent development and deployment
- Database migration system for version-controlled schema changes

### Technology Stack

- **Backend:** A RESTful API built with **Express.js** on Node.js
- **Frontend:** A responsive user interface built with **React.js**, TypeScript, and Tailwind CSS
- **Database:** A **PostgreSQL** database with query operations powered by **Knex.js**
- **Development Environment:** **Docker Compose** for orchestrating all services locally

### Code Base Structure

```
project-root/
├── client/               # Frontend React application
│   ├── src/              # Source code
│   │   ├── assets/       # Static assets
│   │   ├── pages/        # Page components
│   │   └── ...
│   └── ...
├── server/               # Backend Express application
│   ├── src/              # Source code
│   │   ├── db/           # Database migrations and configuration
│   │   └── ...
│   └── ...
└── docker-compose.yml    # Docker Compose configuration
```

---

## Prerequisites

Before starting, ensure you have the following tools installed on your system:

1. **Docker** (v20.10 or higher)

   - [Install Docker for macOS](https://docs.docker.com/desktop/install/mac/)
   - [Install Docker for Windows](https://docs.docker.com/desktop/install/windows/)
   - [Install Docker for Linux](https://docs.docker.com/desktop/install/linux/)

2. **Docker Compose** (v1.29 or higher)

   - Docker Desktop for macOS and Windows includes Docker Compose
   - For Linux: `sudo apt-get install docker-compose-plugin`

3. **Node.js** (v20 or higher)

   - [Download Node.js](https://nodejs.org/)
   - Recommended: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions

4. **Git** (optional, but recommended)

   - [Install Git](https://git-scm.com/downloads)

5. **Code Editor**
   - [Visual Studio Code](https://code.visualstudio.com/) (recommended)
   - Recommended extensions:
     - ESLint
     - Prettier
     - Docker
     - TypeScript

---

## Setup Instructions

### Detailed Setup Steps

1. **Clone or download the repository:**

   **Option 1: Using Git (recommended)**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

   **Option 2: Manual download**

   - Go to the repository's page on GitHub
   - Click the green "Code" button and select "Download ZIP"
   - Extract the ZIP file to your desired location
   - Navigate to the extracted folder in your terminal

2. **Install dependencies:**

   ```bash
   # Install frontend dependencies
   cd client && npm install

   # Install backend dependencies
   cd ../server && npm install

   # Return to project root
   cd ..
   ```

3. **Start the development environment:**

   ```bash
   # Build and start all services
   docker compose up --build
   ```

   This command will:

   - Build all Docker images
   - Start all services defined in docker-compose.yml
   - Connect the services together
   - Forward the necessary ports to your host machine

4. **Access the application:**

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - pgAdmin: [http://localhost:5050](http://localhost:5050)

5. **To stop the environment:**

   ```bash
   # Stop all services
   docker compose down

   ```

### Troubleshooting Common Setup Issues

- **Port conflicts**: If you see errors about ports already being in use, check if you have other services running on ports 3000, 8000, 5432, etc.

- **Docker permission issues**: On Linux, you might need to run Docker commands with `sudo` or add your user to the docker group.

- **Node modules issues**: If you encounter errors related to node modules, try deleting the `node_modules` folders and running `npm install` again.

---

## Database Management

The application uses PostgreSQL as its database system with Knex.js as the query builder and migration tool. This section explains how to manage your database schema and data.

### Database Schema

The database schema is managed through migrations, which are version-controlled scripts that create, modify, or delete database tables and other objects. The current schema includes:

- **example_table**: A sample table with various field types
- **example_foreign_table**: A sample table demonstrating foreign key relationships

You can view the complete schema by:

1. Accessing pgAdmin at [http://localhost:5050](http://localhost:5050)
2. Logging in with the credentials provided in the [pgAdmin section](#pgadmin)
3. Connecting to the database using the credentials in the [Database section](#database-postgresql)
4. Exploring the tables under Servers > PostgreSQL > Databases > symph > Schemas > public > Tables

### Migration Commands

From the `server` directory, use the following commands to manage database migrations:

- **Create a new migration:**

  ```bash
  npm run migration:new -- migration_name
  ```

  This creates a new migration file in `server/src/db/migrations/` with a timestamp prefix.

- **Run all pending migrations:**

  ```bash
  npm run migration:latest
  ```

  This applies all migrations that haven't been run yet.

- **Rollback the last batch of migrations:**

  ```bash
  npm run migration:rollback
  ```

  This undoes the last batch of migrations.

- **Check the status of migrations:**

  ```bash
  npm run migration:status
  ```

  This shows which migrations have been applied and which are pending.

- **Unlock stuck migrations:**

  ```bash
  npm run migration:unlock
  ```

  This resolves issues with migrations that are marked as locked but aren't actually running.

> **Note**: The Docker Compose file includes a `db-migration` service that automatically runs pending migrations when the application starts.

### Data Seeding

You can seed your database with initial data using Knex.js seed files. To create and run seed files:

1. Create a seed file:

   ```bash
   npx knex seed:make seed_name --knexfile=src/db/knexfile.js
   ```

2. Edit the seed file in `server/src/db/seeds/` to insert your data.

3. Run the seed files:

   ```bash
   npx knex seed:run --knexfile=src/db/knexfile.js
   ```

## Services Overview

### Backend (Express.js)

- **Description:** A RESTful API server built with Express.js and TypeScript
- **Code Directory:** `./server`
- **Key Features:**
  - RESTful API endpoints
  - Database integration via Knex.js
  - TypeScript for type safety
  - Hot reloading during development (via nodemon)
- **Port Mapping:**  
  Externally accessible on `http://localhost:8000`
- **API Documentation:**
  - Swagger UI (when implemented): `http://localhost:8000/api-docs`
- **Environment Variables:**
  - `NODE_ENV=development` - Sets the application environment
  - `PORT=8000` - The port the server listens on
  - `DB_CONNECTION_URI=postgres://symph:symph@postgres/symph?sslmode=disable` - Database connection string
  - Additional variables can be configured in `.env` file

---

### Frontend (React.js)

- **Description:** A modern single-page application built with React.js, TypeScript, and Tailwind CSS
- **Code Directory:** `./client`
- **Key Features:**
  - React 18+ with functional components and hooks
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Vite for fast development and optimized builds
  - Hot module replacement during development
- **Port Mapping:**  
  Externally accessible on `http://localhost:3000`
- **Environment Variables:**
  - `VITE_API_URL=http://localhost:8000` - Backend API URL
  - Additional variables can be configured in `.env` file

---

### Database (PostgreSQL)

- **Description:** A powerful, open-source relational database system
- **Image:** `postgres:16-alpine` (lightweight Alpine Linux-based image)
- **Port Mapping:**  
  Externally accessible on `localhost:5432`
- **Key Features:**
  - ACID compliance
  - JSON support
  - Robust transaction support
  - Full-text search capabilities
- **Query Builder:**  
  **Knex.js** is used to manage migrations and queries in the backend
- **Credentials:**
  - **Username:** `symph`
  - **Password:** `symph`
  - **Database Name:** `symph`
- **Volume:**  
  Data is persisted in the `postgres-data` volume, ensuring data survives container restarts
- **Connection String:**

  ```
  postgres://symph:symph@localhost:5432/symph?sslmode=disable
  ```

---

### Development Tools

#### pgAdmin

- **Description:** A comprehensive web-based administration tool for PostgreSQL
- **Image:** `dpage/pgadmin4`
- **Port Mapping:**  
  Accessible on `http://localhost:5050`
- **Key Features:**
  - Database object browser
  - SQL query tool with syntax highlighting
  - Server monitoring
  - Database structure visualization
- **Default Credentials:**
  - **Email:** `admin@example.com`
  - **Password:** `pass`
- **Connection Setup:**
  1. Log in with the credentials above
  2. Right-click on "Servers" and select "Create" > "Server..."
  3. Enter any name in the "General" tab
  4. In the "Connection" tab, enter:
     - Host: `postgres` (the service name in docker-compose)
     - Port: `5432`
     - Username: `symph`
     - Password: `symph`
     - Database: `symph`

#### SMTP Server

- **Description:** A development SMTP server for testing email functionality
- **Image:** `mailhog/mailhog`
- **Key Features:**
  - Captures all outgoing emails
  - Web UI for viewing captured emails
  - API for testing email sending
  - No actual emails are sent to real recipients
- **Port Mapping:**
  - SMTP Server: `localhost:1025` (configure your application to use this for sending mail)
  - Web UI: `http://localhost:8025` (view captured emails here)
- **Usage:**
  - Configure your application to send emails to SMTP server at `localhost:1025`
  - View all sent emails at `http://localhost:8025`

---

## Local Access Links

| Service     | URL                                                              | Description                        |
| ----------- | ---------------------------------------------------------------- | ---------------------------------- |
| Frontend    | [http://localhost:3000](http://localhost:3000)                   | React application UI               |
| Backend API | [http://localhost:8000](http://localhost:8000)                   | Express.js REST API                |
| API Docs    | [http://localhost:8000/api-docs](http://localhost:8000/api-docs) | API documentation (if implemented) |
| PostgreSQL  | `localhost:5432` (via psql or client tools)                      | Database connection                |
| pgAdmin     | [http://localhost:5050](http://localhost:5050)                   | Database management interface      |
| SMTP Web UI | [http://localhost:8025](http://localhost:8025)                   | Email testing interface            |

---

## Development Workflow

### Install Dependencies

```bash
# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

### Build and Start Services

```bash
# Start all services in development mode
docker compose up --build

```

### Stop and Remove Services

```bash
# Stop all services
docker compose down
```

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support and Contact

For questions or support, please contact the Symph careers team.

Default Ports:

- Frontend (React): 3000
- Backend (Express): 8000
- PostgreSQL: 5432
- pgAdmin: 5050
- SMTP dev server: 1025 (SMTP), 8025 (Web UI)

## Submitting your solution

- Please make sure that the code you submit is working and runnable by using docker c ompose up. This will ensure that the code is working in which ever environment you are using.
