# User Address Management System

A NextJS application for managing users' addresses, built as a recruitment task.

## Task Requirements

### UI Requirements

1. Core Features:

    - Paginated users list with mock Create/Edit/Delete actions
    - Paginated user addresses list (visible on user selection)
    - Address management (Create/Edit/Delete) with modal forms
    - Real-time address preview in format:
        ```
        <street> <building_number>
        <post_code> <city>
        <country_code>
        ```

2. Technical Requirements:
    - Minimal UI (no authentication or extra features)
    - Server-side validation error handling
    - Expected many similar CRUD components (i.e. "users_tasks", "users_permissions", etc.), so code should be modular, extensible and generic so that similar modules can be developed with less overhead.
    - TypeScript
    - Codebase should be clean, scalable, follow known conding conventions, paradigms, patterns, etc.
    - Codebase should be prepared for deployment to an environment of your choice.


### Server Requirements

1. Database:

    - PostgreSQL with provided schema (unmodified)
    - Sample data initialization via init.sql

2. API:

    - NextJS Server Actions for database operations
    - Data validation (including ISO3166-1 alpha-3 country codes)



## Project Structure

    src
    ├── app       # Next.js app router pages
    ├── entities  # Domain entities (user, address)
    ├── features  # Feature modules
    ├── shared    # Shared components and utilities
    └── widgets   # Complex UI components


### Architecture

1. Code Organization:

    - Feature-based architecture
    - Modular and extensible components
    - Prepared for future CRUD features (users_tasks, users_permissions, etc.)

2. Technical Stack:
    - TypeScript
    - Next.js 15
    - PostgreSQL
    - Prisma ORM
    - Docker


## Development Setup

1. Prerequisites:

    - Node.js 20+
    - Docker and Docker Compose
    - npm

2. Installation:

    ```bash
    # Clone the repository
    git clone <repository-url>
    cd <project-directory>

    # Setup environment
    cp .env.example .env

    # Install dependencies
    npm install --force

    # Start database
    docker compose up -d

    # If database is empty, reset and restart
    docker compose down -v && docker compose up -d

    # Generate Prisma client
    npm run prisma:generate

    # Start development server
    npm run dev
    ```

3. Available Scripts:
    ```bash
    npm run dev              # Start development server
    npm run build            # Build for production
    npm run start            # Start production server
    npm run lint             # Run linting
    npm run prisma:generate  # Generate Prisma client
    npm run prisma:migrate   # Run database migrations
    npm run prisma:studio    # Open Prisma Studio
    ```

## Production Deployment

1. Environment Setup:

    ```bash
    cp .env.prod .env
    ```

2. Docker Deployment:

    ```bash
    # Build and start containers
    docker compose -f docker-compose.prod.yml up -d --build

    # Run database migrations
    docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
    ```
