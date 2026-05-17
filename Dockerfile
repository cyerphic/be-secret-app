FROM node:22.21.1-alpine

RUN apk add --no-cache bash git gcompat

WORKDIR /app

RUN npm install -g expo @expo/ngrok

# copy package files first to leverage Docker layer caching when dependencies don't change
COPY package*.json ./

RUN npm install --silent --no-audit --no-fund

# copy app sources
COPY . .

EXPOSE 19006 8081

# app
CMD ["sh", "-c", "npx expo start ${EXPO_MODE:---tunnel}"]
