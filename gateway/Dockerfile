FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn run build

FROM node:lts-alpine as runner
EXPOSE 3001
WORKDIR /usr/src/app
COPY . .
COPY --from=builder /usr/src/app/build build
RUN yarn install --production=true
RUN yarn cache clean --all
CMD ["node", "--inspect=9229", "build/server.js"]
