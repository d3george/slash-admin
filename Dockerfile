FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN apk add xdg-utils
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

CMD pnpm dev
