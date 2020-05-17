FROM node:12.14.0 AS base
WORKDIR /app
COPY ./app/package*.json ./


FROM base AS local-dev
ADD ./app /app
RUN npm ci && npm cache clean --force
CMD ["npm", "run", "start-dev"]


FROM base AS production
ENV NODE_ENV=production
RUN chown -R node:node /app
RUN chmod 755 /app
USER node
COPY ./app/dist ./dist
COPY ./scripts/startup-production.sh ./
RUN npm i --only=production
CMD ["node", "./index.js"]
