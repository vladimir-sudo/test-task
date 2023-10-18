ARG NODE_TAG

FROM node:${NODE_TAG}-alpine

WORKDIR /var/www/app

RUN apk add htop vim

RUN npm i -g @nestjs/cli \
    typescript

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN rm -rf ./_docker

CMD npm run start:debug