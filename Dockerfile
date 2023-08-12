FROM node:18-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma db push

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start:dev" ]