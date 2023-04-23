FROM node:16

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/user_upload
RUN mkdir -p /usr/src/app/logs

COPY package*.json ./
RUN npm install --only=production
COPY dist/ .

EXPOSE 8080

CMD [ "node", "index.js" ]

