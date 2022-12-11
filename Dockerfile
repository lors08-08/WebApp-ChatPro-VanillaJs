FROM node:16-alpine

WORKDIR /var/www/app

COPY package*.json ./

# turnoff husky
RUN npm set-script prepare ""

RUN npm install

COPY . .
RUN npm run prod

EXPOSE 3000
CMD ["node", "server/server.js"]


