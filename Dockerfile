FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN corepack enable
RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start:dev"]