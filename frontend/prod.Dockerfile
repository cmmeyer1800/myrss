FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json /app/
COPY public /app/
COPY *.js /app/
COPY *.ts /app/
COPY *.json /app/
COPY index.html /app/

RUN npm install

COPY src /app/src

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./prod.nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]