FROM node:12

WORKDIR /usr/src/app

# Dependencies for headless chrome - puppeteer
RUN echo "deb http://archive.debian.org/debian/ jessie main" > /etc/apt/sources.list
RUN echo "deb-src http://archive.debian.org/debian/ jessie main" >> /etc/apt/sources.list
RUN echo "deb http://archive.debian.org/debian-security/ jessie/updates main" >> /etc/apt/sources.list
RUN echo "deb-src http://archive.debian.org/debian-security/ jessie/updates main" >> /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update
RUN apt install -y libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
RUN apt-get update
RUN apt-get install -y wget gnupg && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && apt-get update && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends
RUN apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends --allow-unauthenticated
RUN apt-get install -y libdrm2 libgbm1 libnss3 --allow-unauthenticated


RUN mkdir -p /usr/src/app/user_upload
RUN mkdir -p /usr/src/app/logs

COPY package*.json ./
RUN npm install --only=production
COPY dist/ .

EXPOSE 8080

CMD [ "node", "index.js" ]

