FROM node:18-alpine As development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate

RUN npm run build

CMD [ "npm", "run", "start:dev" ]