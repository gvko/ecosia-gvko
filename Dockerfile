FROM node:12.14-slim AS base
WORKDIR /app
COPY ./app/package*.json ./


FROM base AS dev
ADD ./app /app
RUN npm ci && npm cache clean --force
CMD ["npm", "run", "start-dev"]


FROM base AS prod
RUN chown -R node:node /app
RUN chmod 755 /app
USER node
COPY ./app/dist ./dist
RUN npm i --only=production
CMD ["node", "./dist/index.js"]
