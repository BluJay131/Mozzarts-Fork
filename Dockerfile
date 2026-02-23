FROM node:18-bullseye as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-bullseye as prod

WORKDIR /app

# install ffmpeg for audio conversion (required by discord.js voice)
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=builder /app/build /app/build

RUN npm ci --omit=dev

ENTRYPOINT [ "npm", "run", "prod" ]
