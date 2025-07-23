# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files
COPY . .

# Set environment variables for server mode (can be overridden at runtime)
ENV NODE_ENV=production
ARG COOKIE_SECRET
ARG JWT_SECRET
ARG DISABLE_MEDUSA_ADMIN
ARG MEDUSA_WORKER_MODE
ARG PORT
ARG DATABASE_URL
ARG REDIS_URL
ARG S3_FILE_URL
ARG S3_BUCKET
ARG S3_ENDPOINT
ARG S3_REGION
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET_ACCESS_KEY

# Build the Medusa application (creates .medusa directory)
RUN yarn build

# Stage 2: Production
FROM node:24-alpine AS production

WORKDIR /app

# Copy built server from builder
COPY --from=builder /app/.medusa/server ./server

# Copy only production dependencies
COPY package.json yarn.lock ./
RUN yarn install

WORKDIR /app/server

# Expose the default Medusa port
EXPOSE 9000

# Start the Medusa server in production mode
CMD ["npx", "medusa", "start"]
