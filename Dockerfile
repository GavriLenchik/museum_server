FROM node:18.16.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./


RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
