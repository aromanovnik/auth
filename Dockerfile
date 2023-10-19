ARG NODE_VERSION=18
ARG SERVER_PORT=3000

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

FROM base as builder

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .

RUN rm -rf /dist/ && npm run build


FROM node:$NODE_VERSION-buster-slim as production
WORKDIR /app

COPY --from=builder /app/dist/ /app/
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
RUN npm install --omit=dev

EXPOSE $SERVER_PORT
CMD [ "node", "/app/main.js" ]
