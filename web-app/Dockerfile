FROM node:lts-alpine as builder
ARG NODE_ENV
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn run build

FROM nginx:alpine as runner
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
