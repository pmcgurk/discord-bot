FROM node:12-slim

WORKDIR /usr/src/app

RUN rm /usr/local/bin/yarn
RUN rm /usr/local/bin/yarnpkg

RUN npm install pm2 yarn --global
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3010

CMD ["sh", "./start_production.sh"]
