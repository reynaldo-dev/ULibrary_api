FROM node:16-alpine3.15 as deps
WORKDIR /app
LABEL key="dependencies"
COPY package*.json ./ 
RUN npm install


FROM node:16-alpine3.15 as builder
ARG PORT
ARG JWT_SECRET
ARG DATABASE_URL

WORKDIR /app
LABEL key="builder"
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine3.15 as runner
ARG PORT
ARG JWT_SECRET
ARG DATABASE_URL

WORKDIR /app
LABEL key="runner"
COPY package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
RUN npm install
EXPOSE ${PORT}

CMD ["node", "dist/app/main.js"]


