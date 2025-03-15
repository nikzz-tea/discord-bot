FROM node:20 as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist/ ./dist/

RUN yarn --production --frozen-lockfile && yarn cache clean

CMD ["yarn", "start"]