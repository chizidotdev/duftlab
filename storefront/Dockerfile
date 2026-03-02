FROM node:24-alpine AS installer
RUN npm install -g pnpm
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install

FROM node:24-alpine AS builder
RUN npm install -g pnpm
COPY . /app/
COPY --from=installer /app/node_modules /app/node_modules
WORKDIR /app

ARG VITE_MEDUSA_PUBLISHABLE_KEY
ARG VITE_MEDUSA_BACKEND_URL

ARG VITE_MEILISEARCH_HOST
ARG VITE_MEILISEARCH_API_KEY
ARG VITE_MEILISEARCH_INDEX_NAME

RUN pnpm run build

FROM node:24-alpine
RUN npm install -g pnpm
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
WORKDIR /app
CMD ["pnpm", "run", "start"]
