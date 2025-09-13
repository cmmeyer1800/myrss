FROM node:24-alpine

WORKDIR /app

COPY package*.json /app/
COPY public /app/
COPY *.js /app/
COPY *.ts /app/
COPY *.json /app/
COPY index.html /app/

RUN npm install

COPY src /app/src

CMD ["npm", "run", "serve"]
