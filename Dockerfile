FROM node:16

WORKDIR /home/node/app

COPY package.json ./

RUN corepack enable
RUN yarn

COPY . .

EXPOSE 3333

USER node

CMD ["yarn", "start:dev"]