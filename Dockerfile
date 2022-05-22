FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9775

EXPOSE 9775

CMD ["npm", "start"]
