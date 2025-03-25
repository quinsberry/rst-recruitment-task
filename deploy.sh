#!/bin/bash

# Pull the latest changes
git pull origin main

# Copy production env file
cp .env.production .env

# Build and start the containers
docker compose -f docker-compose.prod.yml up -d --build

# Run database migrations
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# Clean up unused images
docker image prune -f