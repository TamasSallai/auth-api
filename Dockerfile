FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as production

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

RUN ["node", "dist/index.js"]
