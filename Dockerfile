FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src ./src
RUN bun build src/index.ts --outdir dist

FROM oven/bun:1-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache ttf-dejavu

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

CMD ["bun", "dist/index.js"]
