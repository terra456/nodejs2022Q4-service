FROM node:18-alpine As development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

# RUN npx prisma db push

# RUN npx prisma migrate dev

RUN npm run build

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist


CMD [ "npm", "run", "start:dev" ]