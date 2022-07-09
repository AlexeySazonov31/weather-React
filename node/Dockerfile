FROM node:alpine

WORKDIR /app

COPY package*.json app.js .env ./

RUN npm install

COPY build ./build

EXPOSE 8080

CMD [ "node", "app.js" ]
