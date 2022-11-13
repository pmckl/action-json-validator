FROM node:16

WORKDIR /usr/src/app
COPY ./src/ .
COPY package.json ./
RUN npm install

CMD [ "node", "src/main.js" ]