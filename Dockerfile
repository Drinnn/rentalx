FROM node:16

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "yarn && tail -f /dev/null" ]