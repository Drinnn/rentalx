FROM node:16

USER node

WORKDIR /home/node/app

RUN yarn

CMD [ "sh", "-c", "yarn && tail -f /dev/null" ]