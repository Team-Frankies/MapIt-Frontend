# stage 1: build
FROM node:latest as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
RUN ls -alt

# stage 2: nginx
FROM nginx:1.25.1-alpine
COPY --from=build /usr/src/app/dist/help-desk-front-end /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
