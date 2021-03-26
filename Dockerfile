FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#expose not supported by heroku
# EXPOSE 8000

CMD ["npm","start"]
